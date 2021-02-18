const { isNil, isArray, forEach, reduce } = require('lodash');
const processAttributes = require('../common/process-attributes');
const getWorstResultLevel = require('../common/get-worst-level');

function verifier(structure, value) {
    if (isNil(value)) {
        return;
    }

    if (!isArray(value)) {
        throw new Error('Must be an object');
    }

    forEach(value, (propertyValue) => {
        structure.verify(propertyValue);
    });
}

function validator(structure, attributes, context, value) {
    let results = processAttributes(attributes, context, value, []);

    return reduce(value, (acc, propertyValue, propertyId) => {
        const propertyResults = structure.validate(context, propertyValue);

        acc.$r = getWorstResultLevel(acc.$r, propertyResults.$r);

        acc[propertyId] = propertyResults;

        return acc;
    }, results);
}

module.exports = (Structure) => {
    Structure.arrayOf = (structure, attributes) => 
        new Structure(
            verifier.bind(null, structure), 
            validator.bind(null, structure, attributes)
        );
};