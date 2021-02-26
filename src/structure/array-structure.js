import isNil from 'lodash/isNil';
import isArray from 'lodash/isArray';
import Structure from './structure';
import VerificationError from '../verification-error';

function verifier(value) {
    if (isNil(value)) {
        return;
    }

    if (!isArray(value)) {
        throw new VerificationError('Must be an array');
    }
}

export default () => new Structure(verifier);
