import isNil from 'lodash/isNil';
import isNumber from 'lodash/isNumber';
import Structure from './structure';
import processAspects from '../common/process-aspects';

function verifier(value) {
    if (isNil(value) || isNumber(value)) {
        return;
    }

    throw new Error('Must be a number');
}

function validator(runtime, aspects) {
    return processAspects(runtime, aspects);
}

export default () => new Structure(
    verifier,
    validator,
);
