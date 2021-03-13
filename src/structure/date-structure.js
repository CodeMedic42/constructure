import isNil from 'lodash/isNil';
import isDate from 'lodash/isDate';
import Structure from './structure';
import ValidationResult from '../validation-result';

function verifier(runtime, value) {
    if (isNil(value) || isDate(value)) {
        return new ValidationResult();
    }

    return new ValidationResult('fatal', 'Must be a Date object');
}

export default () => new Structure(verifier);
