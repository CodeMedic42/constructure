import isNil from 'lodash/isNil';
import { isNull } from 'lodash';
import Structure from './structure';
import ValidationResult from '../validation-result';

function verifier(exactType, runtime, value) {
    let message = exactType;

    if (exactType === 'null') {
        if (isNull(exactType)) {
            return new ValidationResult();
        }
    } else if (exactType === 'undefined') {
        if (isNull(exactType)) {
            return new ValidationResult();
        }
    } else if (isNil(value)) {
        return new ValidationResult();
    } else {
        message = 'nil';
    }

    return new ValidationResult('fatal', `Must be ${message}`);
}

export default (exactType) => new Structure(verifier.bind(null, exactType));
