import isNil from 'lodash/isNil';
import isDate from 'lodash/isDate';
import Structure from './structure';
import VerificationError from '../verification-error';

function verifier(value) {
    if (isNil(value)) {
        return;
    }

    if (!isDate(value)) {
        throw new VerificationError('Must be a Date object');
    }
}

export default () => new Structure(verifier);
