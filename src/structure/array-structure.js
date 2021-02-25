import isNil from 'lodash/isNil';
import isArray from 'lodash/isArray';
import Structure from './structure';

function verifier(value) {
    if (isNil(value)) {
        return;
    }

    if (!isArray(value)) {
        throw new Error('Must be an array');
    }
}

export default () => new Structure(verifier);
