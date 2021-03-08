import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';
import isBoolean from 'lodash/isBoolean';
import Structure from './structure';
import VerificationError from '../verification-error';
import ValidationResult from '../validation-result';

function validator(runtime, validators) {
    const groupResults = [];
    const childResults = [];

    for (let counter = 0; counter < validators.length; counter += 1) {
        const childValidator = validators[counter];

        const childRuntime = runtime.branch(counter);

        const propertyResults = childValidator(childRuntime);

        groupResults.push(propertyResults.getResult());

        childResults[counter] = propertyResults;
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

    if (!isArray(value)) {
        throw new VerificationError('Must be an array');
    }

    return value;
}

function basicArrayVerifier(value) {
    valueVerifier(value);
}

function shapeVerifier(structure, exact, rest, value) {
    let target = value;

    if (isNil(valueVerifier(value))) {
        target = [];
    }

    if (target.length <= 0) {
        return null;
    }

    const childValidators = [];
    let itemCounter = 0;

    forEach(structure, (childStructure) => {
        let targetStructure = childStructure;
        let instanceLength = 1;

        if (isArray(childStructure)) {
            [targetStructure, instanceLength] = childStructure;
        }

        for (let instanceCounter = 0; instanceCounter < instanceLength; instanceCounter += 1) {
            // eslint-disable-next-line no-loop-func
            VerificationError.try(itemCounter, () => {
                childValidators[itemCounter] = targetStructure.verify(target[itemCounter]);
            });

            itemCounter += 1;
        }
    });

    if (rest instanceof Structure) {
        for (itemCounter; itemCounter < target.length; itemCounter += 1) {
            childValidators[itemCounter] = rest.verify(target[itemCounter]);
        }
    } else if (exact && itemCounter < target.length) {
        throw new VerificationError(`Array cannot have more than ${itemCounter} item(s)`);
    }

    return (runtime) => {
        return validator(runtime, childValidators);
    };
}

export default (structure, options) => {
    let verifier = null;
    let exact = false;
    let rest = null;

    if (!isNil(options)) {
        if (isBoolean(options)) {
            exact = options;
        } else if (options instanceof Structure) {
            rest = options;
        } else {
            ({ exact, rest } = options);
        }
    }

    if (isNil(structure)) {
        verifier = basicArrayVerifier;
    } else if (structure instanceof Structure) {
        verifier = shapeVerifier.bind(null, [], false, structure);
    } else if (isArray(structure)) {
        verifier = shapeVerifier.bind(null, structure, exact, rest);
    } else {
        throw new Error('Invalid parameters for array structure');
    }

    return new Structure(verifier);
};
