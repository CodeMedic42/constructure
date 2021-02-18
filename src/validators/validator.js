const Symbol = require("es6-symbol");
const { isNil } = require('lodash');
const Result = require('../result');
const requiredValidator = require('./required-validator');

const FIELDS = {
    logic: Symbol('logic'),
    fatal: Symbol('fatal'),
    requirements: Symbol('requirements'),
}

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
            requiredAttributes
        });

        return !isNil(message) ? new Result(message, this[FIELDS.fatal]) : null;
    }

    getRequirements() {
        return this[FIELDS.requirements];
    }
}

requiredValidator(Validator);

module.exports = Validator;