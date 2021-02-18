const { isNil, isArray } = require('lodash');
const Structure = require('./structure');
const processAttributes = require('../common/process-attributes');

function verifier(value) {
    if (isNil(value)) {
        return;
    }

    if (!isArray(value)) {
        throw new Error('Must be an array');
    }
}

function validator(attributes, context, value) {
    return processAttributes(attributes, context, value);
}

module.exports = (Structure) => {
    Structure.array = (attributes) => 
        new Structure(
            verifier.bind(null), 
            validator.bind(null, attributes)
        );
};