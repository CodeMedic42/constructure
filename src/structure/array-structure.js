import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';
import isBoolean from 'lodash/isBoolean';
import Structure from './structure';
import ValidationResult from '../validation-result';

function valueVerifier(value) {
    if (isNil(value) || isArray(value)) {
        return new ValidationResult();
    }

    return new ValidationResult('fatal', 'Must be an array');
}

function basicArrayVerifier(runtime, value) {
    return valueVerifier(value);
}

function shapeVerifier(structure, exact, rest, runtime, value) {
    const validationResult = valueVerifier(value);

    let target = value;

    if (isNil(value) || validationResult.getValueResult() !== 'pass') {
        target = [];
    }

    const groupResults = [];
    const childResults = [];
    let itemCounter = 0;

    forEach(structure, (childStructure) => {
        let targetStructure = childStructure;
        let instanceLength = 1;

        if (isArray(childStructure)) {
            [targetStructure, instanceLength] = childStructure;
        }

        for (let instanceCounter = 0; instanceCounter < instanceLength; instanceCounter += 1) {
            const childRuntime = runtime.branch(itemCounter);

            const childValidationResult = targetStructure.verify(childRuntime, target[itemCounter]);

            groupResults.push(childValidationResult.getResult());
            childResults[itemCounter] = childValidationResult;

            itemCounter += 1;
        }
    });

    let handleExtra = null;

    if (rest instanceof Structure) {
        handleExtra = (childRuntime, childItem) => {
            return rest.verify(childRuntime, childItem);
        };
    } else if (exact && itemCounter < target.length) {
        handleExtra = (childRuntime, childItem, childIndex) => {
            return new ValidationResult('fatal', `Item number ${childIndex} should not exist`);
        };
    }

    if (!isNil(handleExtra)) {
        for (itemCounter; itemCounter < target.length; itemCounter += 1) {
            const childRuntime = runtime.branch(itemCounter);

            const childValidationResult = handleExtra(childRuntime, target[itemCounter]);

            groupResults.push(childValidationResult.getResult());
            childResults[itemCounter] = childValidationResult;
        }
    }

    validationResult.applyResults(groupResults);
    validationResult.setData(childResults);

    return validationResult;
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
