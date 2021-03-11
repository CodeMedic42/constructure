import isNil from 'lodash/isNil';
import isFinite from 'lodash/isFinite';
import Structure from './structure';
import VerificationError from '../verification-error';

function verifier(value) {
    if (isNil(value) || isFinite(value)) {
        return;
    }

    throw new VerificationError('Must be a real number');
}

export default () => new Structure(verifier);
