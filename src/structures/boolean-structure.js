import isNil from 'lodash/isNil';
import isBoolean from 'lodash/isBoolean';
import processAttributes from '../common/process-attributes';

function verifier(value) {
    if (isNil(value) || isBoolean(value)) {
        return;
    }

    throw new Error('Must be a boolean');
}

function validator(attributes, context, value) {
    return processAttributes(attributes, context, value);
}

export default (Structure) => (attributes) => new Structure(
    verifier,
    validator.bind(null, attributes),
);
