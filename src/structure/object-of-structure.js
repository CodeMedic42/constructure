import isNil from 'lodash/isNil';
import keys from 'lodash/keys';
import forEach from 'lodash/forEach';
import isPlainObject from 'lodash/isPlainObject';
import Structure from './structure';
import VerificationError from '../verification-error';
import ValidationResult from '../validation-result';

function validator(runtime, validators) {
    const groupResults = [];
    const childResults = {};

    const propertyIds = keys(validators);

    for (let counter = 0; counter < propertyIds.length; counter += 1) {
        const propertyId = propertyIds[counter];
        const childValidator = validators[propertyId];

        const childRuntime = runtime.branch(propertyId);

        const propertyResults = childValidator(childRuntime);

        groupResults.push(propertyResults.getResult());

        childResults[propertyId] = propertyResults;
    }

    const result = new ValidationResult();

    result.applyResults(groupResults);
    result.setData(childResults);

    return result;
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

    const childValidators = {};

    forEach(value, (propertyValue, propertyId) => {
        VerificationError.try(propertyId, () => {
            childValidators[propertyId] = structure.verify(propertyValue);
        });
    });

    return (runtime) => {
        return validator(runtime, childValidators);
    };
}

export default (structure) => {
    if (!(structure instanceof Structure)) {
        throw new Error('ObjectOf requires a structure.');
    }

    return new Structure(verifier.bind(null, structure));
};
