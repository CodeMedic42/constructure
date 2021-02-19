import processAttributes from '../common/process-attributes';

function verifier() {}

function validator(context, value, attributes) {
    return processAttributes(context, value, attributes);
}

export default (Structure) => () => new Structure(
    verifier,
    validator,
);
