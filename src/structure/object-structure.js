import isNil from 'lodash/isNil';
import isPlainObject from 'lodash/isPlainObject';
import Structure from './structure';
import processAttributes from '../common/process-attributes';

function verifier(value) {
    if (isNil(value)) {
        return;
    }

    if (!isPlainObject(value)) {
        throw new Error('Must be an object');
    }
}

function validator(runtime, attributes) {
    return processAttributes(runtime, attributes);
}

export default () => new Structure(
    verifier,
    validator,
);
