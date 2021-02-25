import isNil from 'lodash/isNil';
import isPlainObject from 'lodash/isPlainObject';
import Structure from './structure';

function verifier(value) {
    if (isNil(value)) {
        return;
    }

    if (!isPlainObject(value)) {
        throw new Error('Must be an object');
    }
}

export default () => new Structure(verifier);
