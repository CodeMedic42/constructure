import Symbol from 'es6-symbol';
import isFunction from 'lodash/isFunction';
import Validator from '../validators/validator';
import Requirements from '../requirements';

const FIELDS = {
    value: Symbol('value'),
    validator: Symbol('validator'),
    requirements: Symbol('requirements'),
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

    clone() {
        const newAttribute = new Attribute(this[FIELDS.value]);

        newAttribute[FIELDS.validator] = this[FIELDS.validator];
        newAttribute[FIELDS.requirements] = this[FIELDS.requirements];

        return newAttribute;
    }
}

export default Attribute;
