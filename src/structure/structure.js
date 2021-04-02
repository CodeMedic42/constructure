import Promise from 'bluebird';
import Symbol from 'es6-symbol';
import shortid from 'shortid';
import {
    isArray,
    isNumber,
    isBoolean,
    isObject,
    isString,
    isNull,
    forEach,
    keys,
    isNil,
    clone,
    merge,
    isUndefined,
} from 'lodash';
import Aspect from '../aspect/aspect';
import Runtime from '../runtime';
import processAspects from '../common/process-aspects';
import ValidationResult from '../validation-result';
import Type from '../type';

const specialInternalAccessor = Symbol('structureSecret');

const FIELDS = {
    id: Symbol('id'),
    aspects: Symbol('aspects'),
    keyed: Symbol('keyed'),
    indexed: Symbol('indexed'),
    allOf: Symbol('allOf'),
    anyOf: Symbol('anyOf'),
    oneOf: Symbol('oneOf'),
    verify: Symbol('verify'),
};

const unknownType = new Type('unknown', isUndefined, Type.ACCESS_TYPES.UNKNOWN);
const undefinedType = new Type('undefined', isUndefined, Type.ACCESS_TYPES.UNDEFINED);

const TYPES = {
    null: new Type('null', isNull, Type.ACCESS_TYPES.SIMPLE),
    string: new Type('string', isString, Type.ACCESS_TYPES.SIMPLE),
    number: new Type('number', isNumber, Type.ACCESS_TYPES.SIMPLE),
    boolean: new Type('boolean', isBoolean, Type.ACCESS_TYPES.SIMPLE),
    array: new Type('array', isArray, Type.ACCESS_TYPES.INDEXED),
    object: new Type('object', isObject, Type.ACCESS_TYPES.KEYED),
};

function determineType(runtime, value) {
    const {
        types,
    } = runtime.getOptions();

    if (isUndefined(value)) {
        return undefinedType;
    }

    const typeIds = keys(types);

    for (let counter = 0; counter < typeIds.length; counter += 1) {
        const typeId = typeIds[counter];
        const type = types[typeId];

        if (isNil(type)) {
            throw new Error(`Undefined Type: ${typeId}`);
        }

        if (type.verify(value)) {
            return type;
        }
    }

    return unknownType;
}

function processOneOf() {}

function processAnyOf() {}

function processAllOf() {}

function evaluateProperties(runtime, validationResult, properties, value) {
    forEach(properties, (childStructure, childPropertyId) => {
        const childRuntime = runtime.branch(childPropertyId);

        const childValidationResult = childStructure[FIELDS.verify](
            childRuntime,
            value[childPropertyId],
        );

        validationResult.mergeChild(childPropertyId, childValidationResult);
    });
}

function evaluatePatterns(runtime, validationResult, patterns, properties, value) {
    if (isNil(patterns)) {
        return;
    }

    const {
        group,
        // : [{
        //     pattern: regEx,
        //     structure: structure
        // }],
        match, // 'any' || 'one' || 'first',
        ignorePropMatch,
    } = patterns;

    forEach(value, (childValue, childValueId) => {
        if (!isNil(properties[childValueId] && ignorePropMatch)) {
            return;
        }

        const childRuntime = runtime.branch(childValueId);

        let targetItems = group.filter(
            (item) => childValueId.match(item.pattern),
        );

        if (match !== 'any') {
            if (match === 'one') {
                if (targetItems.length !== 1) {
                    // TODO This should fail.

                    const childValidationResult = new ValidationResult('fatal', `The property key ${childValueId} should only match one pattern.`);

                    validationResult.mergeChild(childValueId, childValidationResult);

                    return;
                }
            } else if (match === 'first') {
                if (targetItems.length > 1) {
                    targetItems = [targetItems[0]];
                }
            }
        }

        forEach(targetItems, (targetItem) => {
            const childValidationResult = targetItem.structure.verify(childRuntime, childValue);

            validationResult.mergeChild(childValueId, childValidationResult);
        });
    });
}

function processKeys(runtime, validationResult, keyedParameters, value) {
    if (isNil(keyedParameters)) {
        return;
    }

    const {
        properties,
        patterns,
        additional,
        unevaluated,
    } = keyedParameters;

    const localValidationResult = new ValidationResult(validationResult.getObservedType());

    evaluateProperties(runtime, localValidationResult, properties, value);
    evaluatePatterns(runtime, localValidationResult, patterns, properties, value);

    if (!isNil(additional)) {
        forEach(value, (childValue, childId) => {
            if (localValidationResult.hasChild(childId)) {
                return;
            }

            const childRuntime = runtime.branch(childId);

            const childValidationResult = additional.verify(childRuntime, childValue);

            localValidationResult.mergeChild(childId, childValidationResult);
        });
    }

    validationResult.merge(localValidationResult);

    if (!isNil(unevaluated)) {
        forEach(value, (childValue, childId) => {
            if (localValidationResult.hasChild(childId)) {
                return;
            }

            const childRuntime = runtime.branch(childId);

            const childValidationResult = unevaluated.verify(childRuntime, childValue);

            validationResult.mergeChild(childId, childValidationResult);
        });
    }
}

function processIndexes() {}

function verify(runtime, value) {
    const observedType = determineType(runtime, value);

    const validationResult = new ValidationResult(observedType);

    processAspects(
        runtime,
        validationResult,
        this[FIELDS.aspects],
    );

    processOneOf(runtime, validationResult, this[FIELDS.oneOf], value);
    processAnyOf(runtime, validationResult, this[FIELDS.anyOf], value);
    processAllOf(runtime, validationResult, this[FIELDS.AllOf], value);

    const accessType = observedType.getAccessType();

    if (accessType === Type.ACCESS_TYPES.KEYED) {
        processKeys(runtime, validationResult, this[FIELDS.keyed], value);
    } else if (accessType === Type.ACCESS_TYPES.INDEXED) {
        processIndexes(runtime, validationResult, this[FIELDS.indexed], value);
    }

    const thisValueGroup = runtime.getThis();

    thisValueGroup[specialInternalAccessor] = validationResult;

    validationResult.lock();

    return validationResult;
}

class Structure {
    constructor(id = shortid.generate()) {
        this[FIELDS.id] = id;
        this[FIELDS.aspects] = {};
        this[FIELDS.keyed] = null;
        this[FIELDS.indexed] = null;
        this[FIELDS.allOf] = null;
        this[FIELDS.anyOf] = null;
        this[FIELDS.oneOf] = null;

        this[FIELDS.verify] = verify;
    }

    keyed(keyed) {
        this[FIELDS.keyed] = keyed;

        return this;
    }

    indexed(indexed) {
        this[FIELDS.indexed] = indexed;

        return this;
    }

    allOf(allOf) {
        this[FIELDS.allOf] = allOf;

        return this;
    }

    anyOf(anyOf) {
        this[FIELDS.anyOf] = anyOf;

        return this;
    }

    oneOf(oneOf) {
        this[FIELDS.oneOf] = oneOf;

        return this;
    }

    aspect(firstParam, aspectValue, options) {
        let aspect = null;

        if (firstParam instanceof Aspect) {
            aspect = firstParam;
        } else {
            aspect = new Aspect(firstParam, aspectValue, options);
        }

        const id = aspect.getId();

        this[FIELDS.aspects][id] = aspect;

        return this;
    }

    run(value, options = {}) {
        const types = clone(TYPES);

        forEach(options.types, (type, typeId) => {
            types[typeId] = type;
        });

        const runtime = new Runtime(specialInternalAccessor, value, merge({}, options, {
            types,
        }));

        const validationResult = this[FIELDS.verify](runtime, value);

        return Promise.resolve(validationResult.getResult()).then(() => {
            return validationResult;
        });
    }
}

export default Structure;
