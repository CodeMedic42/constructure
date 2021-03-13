import isNil from 'lodash/isNil';
import isString from 'lodash/isString';
import Structure from './structure';
import ValidationResult from '../validation-result';

function verifier(_, value) {
    if (isNil(value) || isString(value)) {
        return new ValidationResult();
    }

    return new ValidationResult('fatal', 'Must be a string');
}

export default () => new Structure(verifier);
