import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';
import reduce from 'lodash/reduce';
import isPlainObject from 'lodash/isPlainObject';
import { keys } from 'lodash';
import Structure from './structure';
import VerificationError from '../verification-error';
import combineResults from '../common/combine-results';

function validator(runtime, structure) {
    const groupResults = [];

    const childResults = reduce(runtime.value, (acc, childValue, childIndex) => {
        const childRuntime = runtime.branch(childIndex);

        const propertyResults = structure.validate(childRuntime, childValue);

        groupResults.push(propertyResults.$r);

        acc[childIndex] = propertyResults;

        return acc;
    }, {});

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

    if (!isPlainObject(value)) {
        throw new VerificationError('Must be an object');
    }

    if (keys(value).length <= 0) {
        return null;
    }

    forEach(value, (propertyValue, propertyId) => {
        VerificationError.try(propertyId, () => {
            structure.verify(propertyValue);
        });
    });

    return (runtime) => {
        return validator(runtime, structure);
    };
}

export default (structure) => {
    if (!(structure instanceof Structure)) {
        throw new Error('ObjectOf requires a structure.');
    }

    return new Structure(verifier.bind(null, structure));
};
