import processAttributes from '../common/process-attributes';

function verifier() {}

function validator(attributes, context, value) {
    return processAttributes(attributes, context, value);
}

export default (Structure) => (attributes) => new Structure(
    verifier,
    validator.bind(null, attributes),
);
