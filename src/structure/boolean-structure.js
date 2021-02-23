import isNil from 'lodash/isNil';
import isBoolean from 'lodash/isBoolean';
import Structure from './structure';
import processAspects from '../common/process-aspects';

function verifier(value) {
    if (isNil(value) || isBoolean(value)) {
        return;
    }

    throw new Error('Must be a boolean');
}

function validator(runtime, aspects) {
    return processAspects(runtime, aspects);
}

export default () => new Structure(
    verifier,
    validator,
);
