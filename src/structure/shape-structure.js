import isNil from 'lodash/isNil';
import reduce from 'lodash/reduce';
import forEach from 'lodash/forEach';
import isPlainObject from 'lodash/isPlainObject';
import Structure from './structure';
import processAttributes from '../common/process-attributes';
import getWorstResultLevel from '../common/get-worst-level';
import createRuntime from '../common/create-runtime';

function verifier(properties, exact, value) {
    if (isNil(value)) {
        return;
    }

    if (!isPlainObject(value)) {
        throw new Error('Must be an object');
    }

    forEach(properties, (property, propertyId) => {
        property.verify(value[propertyId]);
    });

    if (exact) {
        forEach(value, (_, valueId) => {
            if (isNil(properties[valueId])) {
                throw new Error(`The property ${valueId} is invalid`);
            }
        });
    }
}

function validator(properties, runtime, attributes) {
    const groupResults = [];

    const childResults = reduce(properties, (acc, property, propertyId) => {
        const childRuntime = createRuntime(runtime, propertyId);

        const propertyResults = property.validate(childRuntime);

        groupResults.push(propertyResults.$r);

        acc[propertyId] = propertyResults;

        return acc;
    }, {});

    const { $r, $a } = processAttributes(runtime, attributes);

    groupResults.push($r);

    childResults.$a = $a;
    childResults.$r = Promise.all(groupResults)
        .then((results) => reduce(
            results,
            (acc, result) => getWorstResultLevel(acc, result),
            null,
        )).then((finalResult) => {
            childResults.$r = finalResult;

            return finalResult;
        });

    return childResults;
}

export default (properties, exact) => new Structure(
    verifier.bind(null, properties, exact),
    validator.bind(null, properties),
);
