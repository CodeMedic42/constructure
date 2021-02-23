import isNil from 'lodash/isNil';
import isArray from 'lodash/isArray';
import Structure from './structure';
import processAspects from '../common/process-aspects';

function verifier(value) {
    if (isNil(value)) {
        return;
    }

    if (!isArray(value)) {
        throw new Error('Must be an array');
    }
}

function validator(runtime, aspects) {
    return processAspects(runtime, aspects);
}

export default () => new Structure(
    verifier,
    validator,
);
