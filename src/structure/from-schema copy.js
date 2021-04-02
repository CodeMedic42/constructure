/* eslint-disable no-use-before-define */
import { reduce } from 'bluebird';
import {
    forEach,
    isBoolean,
    isEmpty,
    isNil,
    mapValues,
    isArray,
    map,
    isNumber,
    isString,
    isFinite,
    isUndefined,
} from 'lodash';
import Aspect from '../aspect';

// const KEYWORD_TYPE_REFERENCE = {
//     type: [],
//     minLength: {
//         requires: null,
//         types: ['string'],
//     },
//     maxLength: {
//         requires: null,
//         types: ['string'],
//     },
//     pattern: {
//         requires: null,
//         types: ['string'],
//     },
//     minimum: {
//         requires: null,
//         types: ['number', 'integer'],
//     },
//     maximum: {
//         requires: null,
//         types: ['number', 'integer'],
//     },
//     exclusiveMinimum: {
//         requires: null,
//         types: ['number', 'integer'],
//     },
//     exclusiveMaximum: {
//         requires: null,
//         types: ['number', 'integer'],
//     },
//     multipleOf: {
//         requires: null,
//         types: ['number', 'integer'],
//     },
//     minItems: {
//         requires: null,
//         types: ['array'],
//     },
//     maxItems: {
//         requires: null,
//         types: ['array'],
//     },
//     items: {
//         requires: null,
//         types: ['array'],
//     },
//     additionalItems: {
//         requires: 'items',
//         types: ['array'],
//     },
//     uniqueItems: {
//         requires: null,
//         types: ['array'],
//     },
//     properties: {
//         requires: null,
//         types: ['object'],
//     },
//     additionalProperties: {
//         requires: 'properties',
//         types: ['object'],
//     },
//     required: {
//         requires: null,
//         types: ['object'],
//     },
//     minProperties: {
//         requires: null,
//         types: ['object'],
//     },
//     maxProperties: {
//         requires: null,
//         types: ['object'],
//     },
//     dependencies: {
//         requires: null,
//         types: ['object'],
//     },
//     patternProperties: {
//         requires: null,
//         types: ['object'],
//     },
//     regexp: {
//         requires: null,
//         types: ['object'],
//     },
// };

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function asRegEx(properties, patternProperties) {
    const shape = [];

    forEach(properties, (propertySchema, propertyId) => {
        shape.push({
            pattern: new RegExp(escapeRegExp(propertyId)),
            structure: fromType.call(this, propertySchema),
        });
    });

    forEach(patternProperties, (propertySchema, propertyRegEx) => {
        shape.push({
            pattern: new RegExp(propertyRegEx),
            structure: fromType.call(this, propertySchema),
        });
    });

    return shape;
}

function fromObjectType(schema) {
    const {
        properties,
        patternProperties,
        additionalProperties,
        required,
    } = schema;

    const requiredIds = reduce(required, (acc, item) => {
        acc[item] = true;

        return acc;
    }, {});

    let shape = null;

    if (!isEmpty(patternProperties)) {
        shape = asRegEx.call(this, properties, patternProperties);
    } else {
        shape = mapValues(properties, (propertySchema, propertyId) => {
            const structure = fromType.call(this, propertySchema);

            if (!requiredIds[propertyId]) {
                return structure;
            }

            return structure.aspect(Aspect.required());
        }, {});
    }

    if (isBoolean(additionalProperties)) {
        return this.object(shape, !additionalProperties);
    }

    if (!isNil(additionalProperties)) {
        const restStructure = fromType.call(this, additionalProperties);

        return this.object(shape, restStructure);
    }

    return this.object(shape);
}

function fromArrayType(schema) {
    const {
        items,
        minItems,
        maxItems,
        uniqueItems,
        additionalItems,
    } = schema;

    let shape = null;
    let optional = null;

    if (isArray(items)) {
        shape = map(items, (item) => {
            const itemStructure = fromType.call(this, item);

            if (uniqueItems) {
                itemStructure.aspect(Aspect.unique('$parent:keyRoot'));
            }

            return itemStructure;
        });

        if (isBoolean(additionalItems)) {
            // exact
            optional = additionalItems === false;
        } else if (!isNil(additionalItems)) {
            // rest
            optional = fromType.call(this, additionalItems);
        }
    } else if (!isNil(items)) {
        shape = fromType.call(this, items);

        if (uniqueItems) {
            shape.aspect(Aspect.unique('$parent:keyRoot'));
        }
    }

    const arrayStructure = this.array(shape, optional);

    if (isNumber(minItems)) {
        arrayStructure.aspect(Aspect.minLength(minItems));
    }

    if (isNumber(maxItems)) {
        arrayStructure.aspect(Aspect.maxLength(maxItems));
    }

    if (uniqueItems) {
        arrayStructure.aspect(Aspect.register('keyRoot'));
    }

    return arrayStructure;
}

function fromStringType(schema) {
    const {
        minLength,
        maxLength,
        pattern,
        format,
    } = schema;

    const structure = this.string();

    if (isNumber(minLength)) {
        structure.aspect(Aspect.minLength(minLength));
    }

    if (isNumber(maxLength)) {
        structure.aspect(Aspect.maxLength(maxLength));
    }

    if (isString(pattern) && pattern.length > 0) {
        structure.aspect(Aspect.pattern(pattern));
    }

    if (!isNil(format)) {
        switch (format) {
            case 'email':
                structure.aspect(Aspect.emailPattern());
                break;
            default:
                // eslint-disable-next-line no-console
                console.warn(`The string format ${format} is not supported at this time.`);
        }
    }

    return structure;
}

function fromMinMax(incomingValue, incomingExclusive, error, createAspect) {
    let value = null;
    let exclusive = false;

    if (isBoolean(incomingExclusive)) {
        exclusive = true;

        if (isNumber(incomingValue)) {
            value = incomingValue;
        }
    } else if (isFinite(incomingExclusive)) {
        if (isNumber(incomingValue)) {
            throw new Error(error);
        }

        value = incomingExclusive;
        exclusive = true;
    } else if (isNumber(incomingValue)) {
        value = incomingValue;
    }

    if (!isNil(value)) {
        createAspect(value, exclusive);
    }
}

function commonNumberAspects(schema, structure) {
    const {
        multipleOf,
        minimum,
        exclusiveMinimum,
        maximum,
        exclusiveMaximum,
    } = schema;

    if (!isNil(multipleOf)) {
        structure.aspect(Aspect.multiple(multipleOf));
    }

    fromMinMax(
        minimum,
        exclusiveMinimum,
        'Both minimum and exclusiveMinimum cannot be defined at the same time.',
        (min, exclusive) => {
            structure.aspect(Aspect.min({
                min,
                exclusive,
            }));
        },
    );

    fromMinMax(
        maximum,
        exclusiveMaximum,
        'Both maximum and exclusiveMaximum cannot be defined at the same time.',
        (max, exclusive) => {
            structure.aspect(Aspect.max({
                max,
                exclusive,
            }));
        },
    );
}

function fromIntegerType(schema) {
    const structure = this.number()
        .aspect(Aspect.integer());

    commonNumberAspects(schema, structure);

    return structure;
}

function fromNumberType(schema) {
    const structure = this.number();

    commonNumberAspects(schema, structure);

    return structure;
}

function fromBooleanType() {
    return this.boolean();
}

function fromNullType() {
    return this.nothing({
        allowNull: true,
    });
}

function applyEnum(schema, structure) {
    const {
        enum: enumerations,
        const: constant,
    } = schema;

    const values = [];

    if (!isUndefined(constant)) {
        values.push(constant);
    }

    forEach(enumerations, (value) => {
        values.push(value);
    });

    if (values.length > 0) {
        structure.aspect(Aspect.enum(values));
    }
}

const TYPE_PROCESSOR = {
    string: fromStringType,
    integer: fromIntegerType,
    number: fromNumberType,
    boolean: fromBooleanType,
    object: fromObjectType,
    array: fromArrayType,
    null: fromNullType,
};

// function inferSchemas(schema) {
//     const types = {};

//     forEach(schema, (_, key) => {
//         const supportedTypes = KEYWORD_TYPE_REFERENCE[key];

//         if (isNil(supportedTypes)) {
//             throw new Error(`Cannot infer type from keyword ${key}`);
//         }

//         if (!isNil(supportedTypes.requires) && isNil(schema[supportedTypes.requires])) {
//             // This keyword requires another.
//             // If that required keyword does not exist then we ignore this keyword.
//             return;
//         }

//         forEach(supportedTypes.types, (type) => {
//             if (isNil(types[type])) {
//                 types[type] = TYPE_PROCESSOR[type].call(this, schema);
//             }
//         });
//     });

//     const structures = map(types, (type) => type);

//     if (structures.length <= 0) {
//         return this.any();
//     }

//     if (structures.length === 1) {
//         return structures[0];
//     }

//     throw new Error('Not supported yet');
// }

function fromType(schema) {
    const {
        type,
        $ref,
    } = schema;

    let structure = null;

    if (!isNil($ref)) {
        throw new Error('Not Supported');
        // if (!isNil(type)) {
        //     throw new Error('');
        // }
    }

    if (isNil(type)) {
        structure = this.oneOfType(map(TYPE_PROCESSOR, (processor) => {
            return processor.call(this, schema);
        }));
    } else if (isArray(type)) {
        structure = this.oneOfType(map(type, (typeId) => {
            return TYPE_PROCESSOR[typeId].call(this, schema);
        }));
    } else {
        const typeProcessor = TYPE_PROCESSOR[type];

        if (isNil(typeProcessor)) {
            throw new Error(`Unknown type: ${type}`);
        }

        structure = typeProcessor.call(this, schema);
    }

    applyEnum(schema, structure);

    return structure;
}

function fromSchema(schema) {
    if (schema === true) {
        return this.any();
    } if (schema === false) {
        return this.nothing('undefined');
    }

    return fromType.call(this, schema);
}

export default fromSchema;

/*
Notes

allOf
    Verify if there are any types that do not match.
    If there is then generate structure.nothing to just fail anything unless is it nil.

    However of the types do match then do not combine but create different structures for each.
    This could result it multiple similar aspects groups.
    This then forces the need tp stop combining attributes like with lazy and others.
    This could also make dynamic linking of required items more difficult.
    Could I give the structure an id to group them?
    Could I use index to do that?

    Possible new structure could be ...

    {
        $r: '',
        $a: [{

        }],
        $d: {
            $r: '',
            $a: {

            },
        }
    }

    When creating structure must combine like types.
    Any combines with anything else.
    If Any types do not match then the result is structure.nothing

anyOf

    Should validate against one or
    more which means we CANNOT combine and because they do verification and validation

*/
