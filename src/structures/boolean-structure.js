import isNil from 'lodash/isNil';
import isBoolean from 'lodash/isBoolean';
import processAttributes from '../common/process-attributes';

function verifier(value) {
    if (isNil(value) || isBoolean(value)) {
        return;
    }

    throw new Error('Must be a boolean');
}

function validator(context, value, attributes) {
    return processAttributes(context, value, attributes);
}

export default (Structure) => () => new Structure(
    verifier,
    validator,
);
