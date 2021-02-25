import isNil from 'lodash/isNil';
import isBoolean from 'lodash/isBoolean';
import Structure from './structure';

function verifier(value) {
    if (isNil(value) || isBoolean(value)) {
        return;
    }

    throw new Error('Must be a boolean');
}

export default () => new Structure(verifier);
