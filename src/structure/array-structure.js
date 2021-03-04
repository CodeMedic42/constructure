import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';
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

function verifier(structure, options = {}, value) {
    let target = value;

    if (isNil(value)) {
        target = {};
    } else if (!isArray(value)) {
        throw new VerificationError('Must be an array');
    }

    if (isNil(structure)) {
        return null;
    }

    const childValidators = [];

    if (structure instanceof Structure) {
        forEach(value, (itemValue, itemIndex) => {
            VerificationError.try(itemIndex, () => {
                childValidators[itemIndex] = structure.verify(itemValue);
            });
        });
    } else {
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

        const {
            rest,
            exact,
        } = options;

        if (rest instanceof Structure) {
            for (itemCounter; itemCounter < target.length; itemCounter += 1) {
                childValidators[itemCounter] = rest.verify(target[itemCounter]);
            }
        } else if (exact && itemCounter !== target.length) {
            throw new Error(`Array must have exactly ${itemCounter} item(s)`);
        }
    }

    return (runtime) => {
        return validator(runtime, childValidators);
    };
}

export default (structure, options) => new Structure(verifier.bind(null, structure, options));
