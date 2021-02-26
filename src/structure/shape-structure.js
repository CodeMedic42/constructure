import isNil from 'lodash/isNil';
import reduce from 'lodash/reduce';
import forEach from 'lodash/forEach';
import isPlainObject from 'lodash/isPlainObject';
import Structure from './structure';
import combineResults from '../common/combine-results';
import VerificationError from '../verification-error';

function validator(runtime, validators) {
    const groupResults = [];

    const childResults = reduce(validators, (acc, childValidator, propertyId) => {
        const childRuntime = runtime.branch(propertyId);

        const propertyResults = childValidator(childRuntime);

        groupResults.push(propertyResults.$r);

        acc[propertyId] = propertyResults;

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
