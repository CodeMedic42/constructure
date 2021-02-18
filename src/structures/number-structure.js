const { isNil, isNumber } = require('lodash');
const Structure = require('./structure');
const processAttributes = require('../common/process-attributes');

function verifier(value) {
    if (isNil(value) || isNumber(value)) {
        return;
    }

    throw new Error('Must be a number');
}

function validator(attributes, context, value) {
    return processAttributes(attributes, context, value);
}

module.exports = (Structure) => {
    Structure.number = attributes =>
        new Structure(
            verifier, 
            validator.bind(null, attributes)
        );
};