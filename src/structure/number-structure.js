import isNil from 'lodash/isNil';
import isFinite from 'lodash/isFinite';
import Structure from './structure';
import ValidationResult from '../validation-result';

function verifier(_, value) {
    if (isNil(value) || isFinite(value)) {
        return new ValidationResult();
    }

    return new ValidationResult('fatal', 'Must be a real number');
}

export default () => new Structure(verifier);
