import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';
import reduce from 'lodash/reduce';
import isPlainObject from 'lodash/isPlainObject';
import { keys } from 'lodash';
import Structure from './structure';
import VerificationError from '../verification-error';
import ValidationResult from '../validation-result';

function validator(runtime, validators) {
    const groupResults = [];

    const childResults = reduce(validators, (acc, childValidator, propertyId) => {
        const childRuntime = runtime.branch(propertyId);

        const propertyResults = childValidator(childRuntime);

        groupResults.push(propertyResults.getResult());

        acc[propertyId] = propertyResults;

        return acc;
    }, {});

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
