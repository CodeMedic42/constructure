import isNil from 'lodash/isNil';
import isArray from 'lodash/isArray';
import processAttributes from '../common/process-attributes';

function verifier(value) {
    if (isNil(value)) {
        return;
    }

    if (!isArray(value)) {
        throw new Error('Must be an array');
    }
}

function validator(context, value, attributes) {
    return processAttributes(context, value, attributes);
}

export default (Structure) => () => new Structure(
    verifier,
    validator,
);
