import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';
import isBoolean from 'lodash/isBoolean';
import isPlainObject from 'lodash/isPlainObject';
import Structure from './structure';
import ValidationResult from '../validation-result';

function valueVerifier(value) {
    if (isNil(value) || isPlainObject(value)) {
        return new ValidationResult();
    }

    return new ValidationResult('fatal', 'Must be an object');
}

function basicObjectVerifier(runtime, value) {
    return valueVerifier(value);
}

function regExVerifier(patterns, exact, rest, runtime, value) {
    const validationResult = valueVerifier(value);

    const groupResults = [];
    const childResults = {};

    forEach(value, (childValue, childValueId) => {
        const targetPatternItem = patterns.find(
            (patternItem) => childValueId.match(patternItem.pattern),
        );

        const childRuntime = runtime.branch(childValueId);
        let childValidationResult = null;

        if (isNil(targetPatternItem)) {
            if (!isNil(rest)) {
                childValidationResult = rest.verify(childRuntime, childValue);
            } else if (exact) {
                childValidationResult = new ValidationResult('fatal', `The property ${childValueId} is invalid`);
            }
        } else {
            childValidationResult = targetPatternItem.structure.verify(childRuntime, childValue);
        }

        groupResults.push(childValidationResult.getResult());
        childResults[childValueId] = childValidationResult;
    });

    validationResult.applyResults(groupResults);
    validationResult.setData(childResults);

    return validationResult;
}

function shapeVerifier(properties, exact, rest, runtime, value) {
    const validationResult = valueVerifier(value);

    let target = value;

    if (isNil(value) || validationResult.getValueResult() !== 'pass') {
        target = {};
    }

    const groupResults = [];
    const childResults = {};

    let handleExtra = null;

    if (rest instanceof Structure) {
        handleExtra = (childRuntime, childValue) => {
            return rest.verify(childRuntime, childValue);
        };
    } else if (exact) {
        handleExtra = (childRuntime, childValue, childValueId) => {
            return new ValidationResult('fatal', `The property ${childValueId} is invalid`);
        };
    }

    if (!isNil(handleExtra)) {
        forEach(target, (childValue, childValueId) => {
            const childRuntime = runtime.branch(childValueId);

            if (isNil(properties[childValueId])) {
                const childValidationResult = handleExtra(childRuntime, childValue, childValueId);

                groupResults.push(childValidationResult.getResult());
                childResults[childValueId] = childValidationResult;
            }
        });
    }

    forEach(properties, (childStructure, childStructureId) => {
        const childRuntime = runtime.branch(childStructureId);

        const childValidationResult = childStructure.verify(childRuntime, target[childStructureId]);

        groupResults.push(childValidationResult.getResult());
        childResults[childStructureId] = childValidationResult;
    });

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
        verifier = basicObjectVerifier;
    } else if (structure instanceof Structure) {
        verifier = shapeVerifier.bind(null, {}, false, structure);
    } else if (isArray(structure)) {
        verifier = regExVerifier.bind(null, structure, exact, rest);
    } else if (isPlainObject(structure)) {
        verifier = shapeVerifier.bind(null, structure, exact, rest);
    } else {
        throw new Error('Invalid parameters for object structure');
    }

    return new Structure(verifier);
};
