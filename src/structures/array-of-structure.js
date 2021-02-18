import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';
import reduce from 'lodash/reduce';
import isArray from 'lodash/isArray';
import processAttributes from '../common/process-attributes';
import getWorstResultLevel from '../common/get-worst-level';

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
    const results = processAttributes(attributes, context, value, []);

    return reduce(value, (acc, propertyValue, propertyId) => {
        const propertyResults = structure.validate(context, propertyValue);

        acc.$r = getWorstResultLevel(acc.$r, propertyResults.$r);

        acc[propertyId] = propertyResults;

        return acc;
    }, results);
}

export default (Structure) => (structure, attributes) => new Structure(
    verifier.bind(null, structure),
    validator.bind(null, structure, attributes),
);
