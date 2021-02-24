import Promise from 'bluebird';
import Symbol from 'es6-symbol';
import isString from 'lodash/isString';
import Result from '../result';

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
        return Promise.resolve(this[FIELDS.logic](value, aspectValue, requiredAspects))
            .then((message) => {
                return isString(message)
                    ? new Result(message, this[FIELDS.fatal])
                    : null;
            });
    }
}

export default Validator;
