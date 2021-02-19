import Symbol from 'es6-symbol';
import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import Validator from './validators/validator';
import Requirements from './requirements';

const FIELDS = {
    value: Symbol('value'),
    validator: Symbol('validator'),
};

class Attribute {
    constructor(value) {
        this[FIELDS.value] = isFunction(value) ? value : () => value;
        this[FIELDS.validator] = null;
        this[FIELDS.requirements] = new Requirements();
    }

    setValidator(callback, isFatal) {
        this[FIELDS.validator] = new Validator(callback, isFatal);

        return this;
    }

    setRequirements(requirements) {
        this[FIELDS.requirements] = new Requirements(requirements);

        return this;
    }

    getValue() {
        return this[FIELDS.value];
    }

    getValidator() {
        return this[FIELDS.validator];
    }

    getRequirements() {
        return this[FIELDS.requirements];
    }
}

Attribute.required = (attributeValue = true, message = 'Required', fatal = true) => {
    const logic = (context) => {
        if (context.attributeValue !== true || !isNil(context.value)) {
            return null;
        }

        if (isFunction(message)) {
            return message(context);
        }

        return message;
    };

    return (new Attribute(attributeValue)).setValidator(logic, fatal)
};


export default Attribute;
