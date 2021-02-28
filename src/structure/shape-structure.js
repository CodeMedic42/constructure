import isNil from 'lodash/isNil';
import reduce from 'lodash/reduce';
import forEach from 'lodash/forEach';
import isPlainObject from 'lodash/isPlainObject';
import Structure from './structure';
import VerificationError from '../verification-error';
import ValidationResult from '../validation-result';

function validator(runtime, validators) {
    const groupResults = [];

    const childResults = reduce(validators, (acc, childValidator, propertyId) => {
        const childRuntime = runtime.branch(propertyId);

        const propertyResults = childValidator(childRuntime);

        propertyResults.foo = propertyId;

        groupResults.push(propertyResults.getResult());

        acc[propertyId] = propertyResults;

        return acc;
    }, {});

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
