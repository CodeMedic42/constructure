import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';
import isBoolean from 'lodash/isBoolean';
import Structure from './structure';
import ValidationResult from '../validation-result';
import getOption from '../common/get-option';
import typeVerify from '../common/type-verify';

function valueVerifier(value, allowNull) {
    return typeVerify(value, allowNull, isArray, 'Must be an array');
}

function basicArrayVerifier(options, runtime, value) {
    const allowNull = getOption('allowNull', options, runtime.getOptions());

    return valueVerifier(value, allowNull);
}

function shapeVerifier(structure, exact, rest, options, runtime, value) {
    const allowNull = getOption('allowNull', options, runtime.getOptions());
    const force = getOption('force', options, runtime.getOptions());

    const validationResult = valueVerifier(value, allowNull);

    let target = value;

    if (isNil(value) || validationResult.getValueResult() !== 'pass') {
        if (force === true) {
            target = [];
        } else {
            return validationResult;
        }
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
    let force = null;
    let allowNull = null;

    if (!isNil(options)) {
        if (isBoolean(options)) {
            exact = options;
        } else if (options instanceof Structure) {
            rest = options;
        } else {
            ({
                exact = exact,
                rest = rest,
                force = force,
                allowNull = allowNull,
            } = options);
        }
    }

    if (isNil(structure)) {
        verifier = basicArrayVerifier.bind(null, { force, allowNull });
    } else if (structure instanceof Structure) {
        verifier = shapeVerifier.bind(null, [], false, structure, { force, allowNull });
    } else if (isArray(structure)) {
        verifier = shapeVerifier.bind(null, structure, exact, rest, { force, allowNull });
    } else {
        throw new Error('Invalid parameters for array structure');
    }

    return new Structure(verifier);
};
