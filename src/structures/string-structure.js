const { isNil, isString } = require('lodash');
const Structure = require('./structure');
const processAttributes = require('../common/process-attributes');

function verifier(value) {
    if (isNil(value) || isString(value)) {
        return;
    }

    throw new Error('Must be a string');
}

function validator(attributes, context, value) {
    return processAttributes(attributes, context, value);
}

module.exports = (Structure) => {
    Structure.string = attributes =>
        new Structure(
            verifier, 
            validator.bind(null, attributes)
        );
};