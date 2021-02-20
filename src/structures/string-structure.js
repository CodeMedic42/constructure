import isNil from 'lodash/isNil';
import isString from 'lodash/isString';
import processAttributes from '../common/process-attributes';

function verifier(value) {
    if (isNil(value) || isString(value)) {
        return;
    }

    throw new Error('Must be a string');
}

function validator(runtime, attributes) {
    return processAttributes(runtime, attributes);
}

export default (Structure) => () => new Structure(
    verifier,
    validator,
);
