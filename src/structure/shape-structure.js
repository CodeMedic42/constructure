import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';
import keys from 'lodash/keys';
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

function verifier(properties = {}, options = {}, value) {
    let target = value;

    if (isNil(value)) {
        target = {};
    } else if (!isPlainObject(value)) {
        throw new VerificationError('Must be an object');
    }

    if (options.exact) {
        forEach(target, (_, valueId) => {
            if (isNil(properties[valueId])) {
                throw new Error(`The property ${valueId} is invalid`);
            }
        });
    }

    const childValidators = {};

    forEach(properties, (property, propertyId) => {
        VerificationError.try(propertyId, () => {
            childValidators[propertyId] = property.verify(target[propertyId]);
        });
    });

    return (runtime) => {
        return validator(runtime, childValidators);
    };
}

export default (properties, options) => new Structure(verifier.bind(null, properties, options));
