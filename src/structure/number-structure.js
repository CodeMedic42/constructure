import isNil from 'lodash/isNil';
import isNumber from 'lodash/isNumber';
import Structure from './structure';
import processAttributes from '../common/process-attributes';

function verifier(value) {
    if (isNil(value) || isNumber(value)) {
        return;
    }

    throw new Error('Must be a number');
}

function validator(runtime, attributes) {
    return processAttributes(runtime, attributes);
}

export default () => new Structure(
    verifier,
    validator,
);
