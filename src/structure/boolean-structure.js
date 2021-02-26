import isNil from 'lodash/isNil';
import isBoolean from 'lodash/isBoolean';
import Structure from './structure';
import VerificationError from '../verification-error';

function verifier(value) {
    if (isNil(value) || isBoolean(value)) {
        return;
    }

    throw new VerificationError('Must be a boolean');
}

export default () => new Structure(verifier);
