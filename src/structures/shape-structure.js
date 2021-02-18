const { isNil, isPlainObject, forEach, reduce } = require('lodash');
const Structure = require('./structure');
const processAttributes = require('../common/process-attributes');
const getWorstResultLevel = require('../common/get-worst-level');

function verifier(properties, value) {
    if (isNil(value)) {
        return;
    }

    if (!isPlainObject(value)) {
        throw new Error('Must be an object');
    }

    forEach(properties, (property, propertyId) => {
        property.verify(value[propertyId]);
    });
}

function validator(properties, attributes, context, value) {
    const results = processAttributes(attributes, context, value);

    return reduce(properties, (acc, property, propertyId) => {
        const propertyResults = property.validate(context, value[propertyId]);

        acc.$r = getWorstResultLevel(acc.$r, propertyResults.$r);

        acc[propertyId] = propertyResults;

        return acc;
    }, results);
}

module.exports = (Structure) => {
    Structure.shape = (properties, attributes) => 
        new Structure(
            verifier.bind(null, properties), 
            validator.bind(null, properties, attributes)
        );
};