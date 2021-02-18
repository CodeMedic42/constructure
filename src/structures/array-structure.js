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

function validator(attributes, context, value) {
    return processAttributes(attributes, context, value);
}

export default (Structure) => (attributes) => new Structure(
    verifier.bind(null),
    validator.bind(null, attributes),
);
