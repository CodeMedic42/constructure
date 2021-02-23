import Symbol from 'es6-symbol';
import isNil from 'lodash/isNil';
import Result from '../result';
// import requiredValidator from './required-aspect';
// import maxLengthValidator from '../aspects/max-length-aspect';
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

    run(value, aspectValue, requiredAspects) {
        const message = this[FIELDS.logic](
            value,
            aspectValue,
            requiredAspects,
        );

        return !isNil(message) ? new Result(message, this[FIELDS.fatal]) : null;
    }
}

export default Validator;
