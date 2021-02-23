import isNil from 'lodash/isNil';
import isString from 'lodash/isString';
import Structure from './structure';
import processAspects from '../common/process-aspects';

function verifier(value) {
    if (isNil(value) || isString(value)) {
        return;
    }

    throw new Error('Must be a string');
}

function validator(runtime, aspects) {
    return processAspects(runtime, aspects);
}

export default () => new Structure(
    verifier,
    validator,
);
