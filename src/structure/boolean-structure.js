import isNil from 'lodash/isNil';
import isBoolean from 'lodash/isBoolean';
import Structure from './structure';
import ValidationResult from '../validation-result';

function verifier(_, value) {
    if (isNil(value) || isBoolean(value)) {
        return new ValidationResult();
    }

    return new ValidationResult('fatal', 'Must be a boolean');
}

export default () => new Structure(verifier);
