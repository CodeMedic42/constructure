import isNil from 'lodash/isNil';
import isArray from 'lodash/isArray';
import Structure from './structure';
import processAttributes from '../common/process-attributes';

function verifier(value) {
    if (isNil(value)) {
        return;
    }

    if (!isArray(value)) {
        throw new Error('Must be an array');
    }
}

function validator(runtime, attributes) {
    return processAttributes(runtime, attributes);
}

export default () => new Structure(
    verifier,
    validator,
);
