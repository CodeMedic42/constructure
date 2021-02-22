import isNil from 'lodash/isNil';
import isDate from 'lodash/isDate';
import Structure from './structure';
import processAttributes from '../common/process-attributes';

function verifier(value) {
    if (isNil(value)) {
        return;
    }

    if (!isDate(value)) {
        throw new Error('Must be a Date object');
    }
}

function validator(runtime, attributes) {
    return processAttributes(runtime, attributes);
}

export default () => new Structure(
    verifier,
    validator,
);
