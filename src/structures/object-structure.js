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

function validator(context, value, attributes) {
    return processAttributes(context, value, attributes);
}

export default (Structure) => () => new Structure(
    verifier,
    validator,
);
