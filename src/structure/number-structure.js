import isNil from 'lodash/isNil';
import isNumber from 'lodash/isNumber';
import Structure from './structure';

function verifier(value) {
    if (isNil(value) || isNumber(value)) {
        return;
    }

    throw new Error('Must be a number');
}

export default () => new Structure(verifier);
