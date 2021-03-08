/* eslint-disable no-use-before-define */
import { reduce } from 'bluebird';
import {
    forEach, isBoolean, isEmpty, isNil, mapValues, isArray, map, isNumber, isString,
} from 'lodash';
import Aspect from '../aspect';

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
        shape = asRegEx(properties, patternProperties);
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
        return this.object(shape, additionalProperties);
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
    } = schema;

    let shape = null;

    if (isArray(items)) {
        shape = map(items, (item) => {
            const itemStructure = fromType.call(this, item);

            if (uniqueItems) {
                itemStructure.aspect(Aspect.unique('$parent:keyRoot'));
            }

            return itemStructure;
        });
    } else {
        shape = fromType.call(this, items);

        if (uniqueItems) {
            shape.aspect(Aspect.unique('$parent:keyRoot'));
        }
    }

    const arrayStructure = this.array(shape);

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

    switch (format) {
        case 'email':
            structure.aspect(Aspect.emailPattern());
            break;
        default:
            console.warn(`The string format ${format} is not supported at this time.`);
    }

    return structure;
}

function applyEnum(schema, structure) {
    const {
        enum: enumerations,
        const: constant,
    } = schema;

    const values = [];

    if (!isNil(constant)) {
        values.push(constant);
    }

    forEach(enumerations, (value) => {
        values.push(value);
    });

    if (values.length > 0) {
        structure.aspect(Aspect.enum(values));
    }
}

function fromType(schema) {
    const {
        type,
    } = schema;

    let structure = null;

    if (isNil(type)) {
        structure = this.any();
    }

    switch (type) {
        case 'string':
            structure = fromStringType.call(this, schema);
            break;
        case 'integer':
            structure = this.integer();
            break;
        case 'number':
            structure = this.number();
            break;
        case 'boolean':
            structure = this.boolean();
            break;
        case 'object':
            structure = fromObjectType.call(this, schema);
            break;
        case 'array':
            structure = fromArrayType.call(this, schema);
            break;
        case 'null':
            throw new Error('Null type not supported');
        default:
            throw new Error(`Invalid type ${type}`);
    }

    applyEnum(schema, structure);

    return structure;
}

function fromSchema(schema) {
    if (schema === true) {
        return this.any();
    } if (schema === false) {
        return null;
    }

    return fromType.call(this, schema);
}

export default fromSchema;
