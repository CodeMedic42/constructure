const { isNil, isPlainObject } = require('lodash');
const Structure = require('./structure');
const processAttributes = require('../common/process-attributes');

function verifier(value) {
    if (isNil(value)) {
        return;
    }

    if (!isPlainObject(value)) {
        throw new Error('Must be an object');
    }
}

function validator(attributes, context, value) {
    return processAttributes(attributes, context, value);
}

module.exports = (Structure) => {
    Structure.object = (attributes) => 
        new Structure(
            verifier.bind(null), 
            validator.bind(null, attributes)
        );
};