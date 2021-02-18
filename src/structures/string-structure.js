import isNil from 'lodash/isNil';
import isString from 'lodash/isString';
import processAttributes from '../common/process-attributes';

function verifier(value) {
    if (isNil(value) || isString(value)) {
        return;
    }

    throw new Error('Must be a string');
}

function validator(attributes, context, value) {
    return processAttributes(attributes, context, value);
}

export default (Structure) => (attributes) => new Structure(
    verifier,
    validator.bind(null, attributes),
);
