import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';
import reduce from 'lodash/reduce';
import isArray from 'lodash/isArray';
import Structure from './structure';
import combineResults from '../common/combine-results';
import VerificationError from '../verification-error';

function validator(runtime, structure) {
    const groupResults = [];

    const childResults = reduce(runtime.value, (acc, childValue, childIndex) => {
        const childRuntime = runtime.branch(childIndex);

        const propertyResults = structure.validate(childRuntime, childValue);

        groupResults.push(propertyResults.$r);

        acc[childIndex] = propertyResults;

        return acc;
    }, []);

    childResults.$a = {};
    childResults.$r = combineResults(groupResults)
        .then((finalResult) => {
            childResults.$r = finalResult;

            return finalResult;
        });

    return childResults;
}

function verifier(structure, value) {
    if (isNil(value)) {
        return null;
    }

    if (!isArray(value)) {
        throw new VerificationError('Must be an array');
    }

    if (value.length <= 0) {
        return null;
    }

    forEach(value, (propertyValue) => {
        structure.verify(propertyValue);
    });

    return (runtime) => {
        return validator(runtime, structure);
    };
}

export default (structure) => {
    if (!(structure instanceof Structure)) {
        throw new Error('ArrayOf requires a structure.');
    }

    return new Structure(verifier.bind(null, structure));
};
