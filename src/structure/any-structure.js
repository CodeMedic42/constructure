import processAspects from '../common/process-aspects';
import Structure from './structure';

function verifier() {}

function validator(runtime, aspects) {
    return processAspects(runtime, aspects);
}

export default () => new Structure(
    verifier,
    validator,
);
