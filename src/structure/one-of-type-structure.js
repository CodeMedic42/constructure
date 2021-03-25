import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';
import Structure from './structure';
import ValidationResult from '../validation-result';

// TODO: Verify what happens to to promises and extra runtime branches from failed tries.

function verifier(structures, runtime, value) {
    let validationResult = null;

    forEach(structures, (structure) => {
        const pendingValidationResult = structure.verify(runtime, value);

        if (pendingValidationResult.getValueResult() === 'pass') {
            validationResult = pendingValidationResult;

            return false;
        }

        return true;
    });

    if (isNil(validationResult)) {
        return new ValidationResult('fatal', 'Must match one of the given structures');
    }

    return validationResult;
}

export default (structures) => new Structure(verifier.bind(null, structures));
