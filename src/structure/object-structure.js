import isNil from 'lodash/isNil';
import isPlainObject from 'lodash/isPlainObject';
import Structure from './structure';
import processAspects from '../common/process-aspects';

function verifier(value) {
    if (isNil(value)) {
        return;
    }

    if (!isPlainObject(value)) {
        throw new Error('Must be an object');
    }
}

function validator(runtime, aspects) {
    return processAspects(runtime, aspects);
}

export default () => new Structure(
    verifier,
    validator,
);
