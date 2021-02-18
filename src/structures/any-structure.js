const { isNil, isString } = require('lodash');
const Structure = require('./structure');
const processAttributes = require('../common/process-attributes');

function verifier() {}

function validator(attributes, context, value) {
    return processAttributes(attributes, context, value);
}

module.exports = (Structure) => {
    Structure.any = attributes =>
        new Structure(
            verifier, 
            validator.bind(null, attributes)
        );
};