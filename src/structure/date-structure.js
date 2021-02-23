import isNil from 'lodash/isNil';
import isDate from 'lodash/isDate';
import Structure from './structure';
import processAspects from '../common/process-aspects';

function verifier(value) {
    if (isNil(value)) {
        return;
    }

    if (!isDate(value)) {
        throw new Error('Must be a Date object');
    }
}

function validator(runtime, aspects) {
    return processAspects(runtime, aspects);
}

export default () => new Structure(
    verifier,
    validator,
);
