import isNil from 'lodash/isNil';
import isPlainObject from 'lodash/isPlainObject';
import processAttributes from '../common/process-attributes';

function verifier(value) {
    if (isNil(value)) {
        return;
    }

    if (!isPlainObject(value)) {
        throw new Error('Must be an object');
    }
}

function validator(attributes, context, value) {
    return processAttributes(attributes, context, value);
}

export default (Structure) => (attributes) => new Structure(
    verifier.bind(null),
    validator.bind(null, attributes),
);
