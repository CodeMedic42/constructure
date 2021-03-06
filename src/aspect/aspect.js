import Symbol from 'es6-symbol';
import { isNil } from 'lodash';
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import split from 'lodash/split';
import toPath from 'lodash/toPath';
import startsWith from 'lodash/startsWith';

const FIELDS = {
    id: Symbol('id'),
    value: Symbol('value'),
    onValidate: Symbol('onValidate'),
    fatal: Symbol('fatal'),
    requirements: Symbol('requirements'),
};

function processRequirements(requirements) {
    const processed = [];

    if (isNil(requirements)) {
        return processed;
    }

    for (let counter = 0; counter < requirements.length; counter += 1) {
        const requirement = requirements[counter];

        let path = null;
        let aspect = null;

        if (isString(requirement)) {
            const parts = split(requirement, ':');

            [path, aspect] = parts;
        } else {
            path = requirement.path;
            aspect = requirement.aspect;
        }

        path = toPath(path);

        if (!startsWith(path[0], '$')) {
            path.splice(0, 0, '$this');
        }

        processed.push({
            path,
            aspect,
        });
    }

    return processed;
}

class Aspect {
    constructor(id, value, options = {}) {
        const {
            validator,
            require,
        } = options;

        this[FIELDS.id] = id;

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

        this[FIELDS.requirements] = processRequirements(require);

        this[FIELDS.value] = isFunction(value) ? value : () => value;
    }

    getId() {
        return this[FIELDS.id];
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
