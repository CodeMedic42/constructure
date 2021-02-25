import isNil from 'lodash/isNil';
import isDate from 'lodash/isDate';
import Structure from './structure';

function verifier(value) {
    if (isNil(value)) {
        return;
    }

    if (!isDate(value)) {
        throw new Error('Must be a Date object');
    }
}

export default () => new Structure(verifier);
