import isNil from 'lodash/isNil';
import isBoolean from 'lodash/isBoolean';
import Structure from './structure';
import processAttributes from '../common/process-attributes';

function verifier(value) {
    if (isNil(value) || isBoolean(value)) {
        return;
    }

    throw new Error('Must be a boolean');
}

function validator(runtime, attributes) {
    return processAttributes(runtime, attributes);
}

export default () => new Structure(
    verifier,
    validator,
);
