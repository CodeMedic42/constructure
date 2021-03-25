import { isUndefined, isNull } from 'lodash';
import ValidationResult from '../validation-result';

export default function typeVerify(value, allowNull, specificTypeTest, message) {
    if (isNull(value)) {
        if (!allowNull) {
            return new ValidationResult('fatal', 'Null is not allowed');
        }

        return new ValidationResult();
    }

    if (isUndefined(value) || specificTypeTest(value)) {
        return new ValidationResult();
    }

    return new ValidationResult('fatal', message);
}
