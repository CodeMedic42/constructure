import Symbol from 'es6-symbol';
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import Validator from '../validator';
import Requirements from '../requirements';

const FIELDS = {
    value: Symbol('value'),
    validator: Symbol('validator'),
    requirements: Symbol('requirements'),
};

class Aspect {
    constructor(value, options = {}) {
        const {
            validator,
            require,
        } = options;

        let onValidate = null;
        let isFatal = true;

        if (isPlainObject(validator)) {
            ({ onValidate, isFatal } = validator);
        } else {
            onValidate = validator;
        }

        if (isFunction(onValidate)) {
            this[FIELDS.validator] = new Validator(onValidate, isFatal === true);
        }

        this[FIELDS.requirements] = new Requirements(require);

        this[FIELDS.value] = isFunction(value) ? value : () => value;
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

export default Aspect;
