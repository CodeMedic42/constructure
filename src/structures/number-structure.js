import isNil from 'lodash/isNil';
import isNumber from 'lodash/isNumber';
import processAttributes from '../common/process-attributes';

function verifier(value) {
    if (isNil(value) || isNumber(value)) {
        return;
    }

    throw new Error('Must be a number');
}

function validator(attributes, context, value) {
    return processAttributes(attributes, context, value);
}

export default (Structure) => (attributes) => new Structure(
    verifier,
    validator.bind(null, attributes),
);
