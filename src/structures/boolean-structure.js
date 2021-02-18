const { isNil, isBoolean } = require('lodash');
const Structure = require('./structure');
const processAttributes = require('../common/process-attributes');

function verifier(value) {
    if (isNil(value) || isBoolean(value)) {
        return;
    }

    throw new Error('Must be a boolean');
}

function validator(attributes, context, value) {
    return processAttributes(attributes, context, value);
}

module.exports = (Structure) => {
    Structure.boolean = attributes =>
        new Structure(
            verifier, 
            validator.bind(null, attributes)
        );
};