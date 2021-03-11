import isNil from 'lodash/isNil';
import { isNull } from 'lodash';
import Structure from './structure';
import VerificationError from '../verification-error';

function verifier(exactType, value) {
    let message = exactType;

    if (exactType === 'null') {
        if (isNull(exactType)) {
            return null;
        }
    } else if (exactType === 'undefined') {
        if (isNull(exactType)) {
            return null;
        }
    } else if (isNil(value)) {
        return null;
    } else {
        message = 'nil';
    }

    throw new VerificationError(`Must be ${message}`);
}

export default (exactType) => new Structure(verifier.bind(exactType));
