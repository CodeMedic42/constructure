import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';
import reduce from 'lodash/reduce';
import isArray from 'lodash/isArray';
import Structure from './structure';
import createRuntime from '../common/create-runtime';
import processAspects from '../common/process-aspects';
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

function validator(structure, runtime, aspects) {
    const groupResults = [];

    const childResults = reduce(runtime.value, (acc, childValue, childIndex) => {
        const childRuntime = createRuntime(runtime, childIndex);

        const propertyResults = structure.validate(childRuntime, childValue);

        groupResults.push(propertyResults.$r);

        acc[childIndex] = propertyResults;

        return acc;
    }, []);

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