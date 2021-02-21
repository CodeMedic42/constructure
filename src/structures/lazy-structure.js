import isNil from 'lodash/isNil';
import processAttributes from '../common/process-attributes';

function verifier(callback, value) {
    if (isNil(value)) {
        return null;
    }

    const structure = callback();

    if (isNil(structure)) {
        throw new Error('Lazy structure callbacks must return a structure.');
    }

    structure.verify(value);

    return structure;
}

function validator(runtime, attributes) {
    return processAttributes(runtime, attributes);
}

export default (Structure) => (callback) => new Structure(
    verifier.bind(null, callback),
    validator.bind(null, callback),
);
