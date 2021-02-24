import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';
import reduce from 'lodash/reduce';
import isPlainObject from 'lodash/isPlainObject';
import Structure from './structure';
import processAspects from '../common/process-aspects';
import getWorstResultLevel from '../common/get-worst-level';

function verifier(structure, value) {
    if (isNil(value)) {
        return;
    }

    if (!isPlainObject(value)) {
        throw new Error('Must be an object');
    }

    forEach(value, (propertyValue) => {
        structure.verify(propertyValue);
    });
}

function validator(structure, runtime, aspects) {
    const groupResults = [];

    const childResults = reduce(runtime.value, (acc, propertyValue, propertyId) => {
        const childRuntime = runtime.branch(propertyId);

        const propertyResults = structure.validate(childRuntime, propertyValue);

        groupResults.push(propertyResults.$r);

        acc[propertyId] = propertyResults;

        return acc;
    }, {});

    const { $r, $a } = processAspects(runtime, aspects);

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

export default (structure) => new Structure(
    verifier.bind(null, structure),
    validator.bind(null, structure),
);
