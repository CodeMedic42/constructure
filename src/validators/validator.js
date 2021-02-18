import Symbol from 'es6-symbol';
import isNil from 'lodash/isNil';
import Result from '../result';
import requiredValidator from './required-validator';
import maxLengthValidator from './max-length-validator';
import maxValidator from './max-validator';
import minLengthValidator from './min-length-validator';
import minValidator from './min-validator';

const FIELDS = {
    logic: Symbol('logic'),
    fatal: Symbol('fatal'),
    requirements: Symbol('requirements'),
};

class Validator {
    constructor(logic = null, fatal = true, requirements = []) {
        this[FIELDS.logic] = logic;
        this[FIELDS.fatal] = fatal;
        this[FIELDS.requirements] = requirements;
    }

    run(context, value, attributeValue, requiredAttributes) {
        const message = this[FIELDS.logic]({
            ...context,
            value,
            attributeValue,
            requiredAttributes,
        });

        return !isNil(message) ? new Result(message, this[FIELDS.fatal]) : null;
    }

    getRequirements() {
        return this[FIELDS.requirements];
    }
}

Validator.required = requiredValidator(Validator);
Validator.maxLength = maxLengthValidator(Validator);
Validator.max = maxValidator(Validator);
Validator.minLength = minLengthValidator(Validator);
Validator.min = minValidator(Validator);

export default Validator;
