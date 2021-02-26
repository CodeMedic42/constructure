import isNil from 'lodash/isNil';
import isNumber from 'lodash/isNumber';
import Structure from './structure';
import VerificationError from '../verification-error';

function verifier(value) {
    if (isNil(value) || isNumber(value)) {
        return;
    }

    throw new VerificationError('Must be a number');
}

export default () => new Structure(verifier);
