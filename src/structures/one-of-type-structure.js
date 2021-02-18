import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';
import reduce from 'lodash/reduce';
import processAttributes from '../common/process-attributes';
import getWorstResultLevel from '../common/get-worst-level';

function verifier(structures, value) {
    if (isNil(value)) {
        return null;
    }

    let passingStructure = null;

    forEach(structures, (structure) => {
        try {
            structure.verify(value);

            passingStructure = structure;
        } catch {
            // We are just going to ignore this for now.
        }
    });

    if (isNil(passingStructure)) {
        throw new Error('Must match one of the given structures');
    }

    return passingStructure;
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

export default (Structure) => (valueType, attributes) => new Structure(
    verifier.bind(null, valueType),
    validator.bind(null, valueType, attributes),
);
