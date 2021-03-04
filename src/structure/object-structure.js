import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';
import keys from 'lodash/keys';
import isArray from 'lodash/isArray';
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

function valueVerifier(value) {
    if (isNil(value)) {
        return null;
    }

    if (!isPlainObject(value)) {
        throw new VerificationError('Must be an object');
    }

    return value;
}

function basicObjectVerifier(value) {
    valueVerifier(value);
}

function singleStructureVerifier(structure, value) {
    if (isNil(valueVerifier(value))) {
        return null;
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

function regExVerifier(patterns, exact, rest, value) {
    if (isNil(valueVerifier(value))) {
        return null;
    }

    const childValidators = {};

    forEach(value, (childValue, childValueId) => {
        const targetPatternItem = patterns.find(
            (patternItem) => childValueId.match(patternItem.pattern),
        );

        if (isNil(targetPatternItem)) {
            if (!isNil(rest)) {
                VerificationError.try(childValueId, () => {
                    childValidators[childValueId] = rest.verify(childValue);
                });
            } else if (exact) {
                throw new Error(`The property ${childValueId} is invalid`);
            }
        } else {
            VerificationError.try(childValueId, () => {
                childValidators[childValueId] = targetPatternItem.structure.verify(childValue);
            });
        }
    });

    return (runtime) => {
        return validator(runtime, childValidators);
    };
}

function shapeVerifier(properties, exact, rest, value) {
    let target = value;

    if (isNil(valueVerifier(value))) {
        target = {};
    }

    const childValidators = {};

    let handleExtra = null;

    if (rest instanceof Structure) {
        handleExtra = (childProperty, childPropertyId) => {
            VerificationError.try(childPropertyId, () => {
                childValidators[childPropertyId] = rest.verify(childProperty);
            });
        };
    } else if (exact) {
        handleExtra = (_, childPropertyId) => {
            throw new Error(`The property ${childPropertyId} is invalid`);
        };
    }

    if (!isNil(handleExtra)) {
        forEach(target, (childProperty, childPropertyId) => {
            if (isNil(properties[childPropertyId])) {
                handleExtra(childProperty, childPropertyId);
            }
        });
    }

    forEach(properties, (childStructure, childStructureId) => {
        VerificationError.try(childStructureId, () => {
            childValidators[childStructureId] = childStructure.verify(target[childStructureId]);
        });
    });

    return (runtime) => {
        return validator(runtime, childValidators);
    };
}

export default (structure, options = {}) => {
    let verifier = null;

    const {
        exact = false,
        rest = null,
    } = options;

    if (isNil(structure)) {
        verifier = basicObjectVerifier;
    } else if (structure instanceof Structure) {
        verifier = singleStructureVerifier.bind(null, structure);
    } else if (isArray(structure)) {
        verifier = regExVerifier.bind(null, structure, exact, rest);
    } else if (isPlainObject(structure)) {
        verifier = shapeVerifier.bind(null, structure, exact, rest);
    } else {
        throw new Error('Invalid parameters for object structure');
    }

    return new Structure(verifier);
};
