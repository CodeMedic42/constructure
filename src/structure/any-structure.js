import Structure from './structure';
import ValidationResult from '../validation-result';

function verifier() {
    return new ValidationResult();
}

export default () => new Structure(verifier);
