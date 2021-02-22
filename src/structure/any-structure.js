import processAttributes from '../common/process-attributes';
import Structure from './structure';

function verifier() {}

function validator(runtime, attributes) {
    return processAttributes(runtime, attributes);
}

export default () => new Structure(
    verifier,
    validator,
);
