import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';
import reduce from 'lodash/reduce';
import isArray from 'lodash/isArray';
import Structure from './structure';
import ValidationResult from '../validation-result';
import VerificationError from '../verification-error';

function validator(runtime, validators) {
    const groupResults = [];

    const childResults = reduce(validators, (acc, childValidator, propertyId) => {
        const childRuntime = runtime.branch(propertyId);

        const propertyResults = childValidator(childRuntime);

        groupResults.push(propertyResults.getResult());

        acc[propertyId] = propertyResults;

        return acc;
    }, []);

    const result = new ValidationResult();

    result.applyResults(groupResults);
    result.setData(childResults);

    return result;
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

    const childValidators = [];

    forEach(value, (propertyValue, propertyIndex) => {
        VerificationError.try(propertyIndex, () => {
            childValidators[propertyIndex] = structure.verify(propertyValue);
        });
    });

    return (runtime) => {
        return validator(runtime, childValidators);
    };
}

export default (structure) => {
    if (!(structure instanceof Structure)) {
        throw new Error('ArrayOf requires a structure.');
    }

    return new Structure(verifier.bind(null, structure));
};
