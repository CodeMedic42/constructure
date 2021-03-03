import Symbol from 'es6-symbol';
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import Requirements from '../requirements';

const FIELDS = {
    value: Symbol('value'),
    onValidate: Symbol('onValidate'),
    fatal: Symbol('fatal'),
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

        this[FIELDS.fatal] = isFatal;

        if (isFunction(onValidate)) {
            this[FIELDS.onValidate] = onValidate;
        }

        this[FIELDS.requirements] = new Requirements(require);

        this[FIELDS.value] = isFunction(value) ? value : () => value;
    }

    getValue() {
        return this[FIELDS.value];
    }

    getOnValidate() {
        return this[FIELDS.onValidate];
    }

    getFatal() {
        return this[FIELDS.fatal];
    }

    getRequirements() {
        return this[FIELDS.requirements];
    }
}

export default Aspect;
