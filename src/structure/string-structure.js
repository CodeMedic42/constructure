import isNil from 'lodash/isNil';
import isString from 'lodash/isString';
import Structure from './structure';
import VerificationError from '../verification-error';

function verifier(value) {
    if (isNil(value) || isString(value)) {
        return null;
    }

    throw new VerificationError('Must be a string');
}

export default () => new Structure(verifier);
