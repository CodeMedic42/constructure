const { isNil, isPlainObject, forEach, reduce } = require('lodash');
const Structure = require('./structure');
const processAttributes = require('../common/process-attributes');
const getWorstResultLevel = require('../common/get-worst-level');

function verifier(structures, value) {
    if (isNil(value)) {
        return;
    }

    let passingStructure = null;

    forEach(structures, structure => {
        try {
            structure.verify(value);

            pass = structure;
        } catch {
            // We are just going to ignore this for now.
        }
    });

    if (isNil(passingStructure)) {
        throw new Error('Must match one of the given structures');
    }

    return structure;
}

function validator(valueType, attributes, context, value) {
    const results = processAttributes(attributes, context, value);

    return reduce(value, (acc, propertyValue, propertyId) => {
        const propertyResults = valueType.validate(context, propertyValue);

        acc.$r = getWorstResultLevel(acc.$r, propertyResults.$r);

        acc[propertyId] = propertyResults;

        return acc;
    }, results);
}

module.exports = (Structure) => {
    Structure.oneOfType = (valueType, attributes) => 
        new Structure(
            verifier.bind(null, valueType), 
            validator.bind(null, valueType, attributes)
        );
};