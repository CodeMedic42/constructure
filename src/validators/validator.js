import Symbol from 'es6-symbol';
import isNil from 'lodash/isNil';
import Result from '../result';
// import requiredValidator from './required-attribute';
// import maxLengthValidator from '../attributes/max-length-attribute';
// import maxValidator from './max-validator';
// import minLengthValidator from './min-length-validator';
// import minValidator from './min-validator';
// import Requirements from '../requirements';

const FIELDS = {
    logic: Symbol('logic'),
    fatal: Symbol('fatal'),
    requirements: Symbol('requirements'),
};

class Validator {
    constructor(logic = null, fatal = true) {
        this[FIELDS.logic] = logic;
        this[FIELDS.fatal] = fatal;
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
}

export default Validator;
