import isNil from 'lodash/isNil';
import isString from 'lodash/isString';
import Structure from './structure';

function verifier(value) {
    if (isNil(value) || isString(value)) {
        return null;
    }

    throw new Error('Must be a string');
}

export default () => new Structure(verifier);
