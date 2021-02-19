import isNil from 'lodash/isNil';
import isString from 'lodash/isString';
import processAttributes from '../common/process-attributes';

function verifier(value) {
    if (isNil(value) || isString(value)) {
        return;
    }

    throw new Error('Must be a string');
}

function validator(context, value, attributes) {
    return processAttributes(context, value, attributes);
}

export default (Structure) => () => new Structure(
    verifier,
    validator,
);
