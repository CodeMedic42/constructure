import isNil from 'lodash/isNil';
import isPlainObject from 'lodash/isPlainObject';
import Structure from './structure';
import VerificationError from '../verification-error';

function verifier(value) {
    if (isNil(value)) {
        return;
    }

    if (!isPlainObject(value)) {
        throw new VerificationError('Must be an object');
    }
}

export default () => new Structure(verifier);
