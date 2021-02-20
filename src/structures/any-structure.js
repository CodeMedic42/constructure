import processAttributes from '../common/process-attributes';

function verifier() {}

function validator(runtime, attributes) {
    return processAttributes(runtime, attributes);
}

export default (Structure) => () => new Structure(
    verifier,
    validator,
);
