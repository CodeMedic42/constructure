import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';
import Structure from './structure';
import processAspects from '../common/process-aspects';

function verifier(structures, value) {
    if (isNil(value)) {
        return null;
    }

    let passingStructure = null;

    forEach(structures, (structure) => {
        try {
            structure.verify(value);

            passingStructure = structure;

            return false;
        } catch {
            // We are just going to ignore this for now.
        }

        return true;
    });

    if (isNil(passingStructure)) {
        throw new Error('Must match one of the given structures');
    }

    return passingStructure;
}

function validator(runtime, aspects) {
    return processAspects(runtime, aspects);
}

export default (structures) => new Structure(
    verifier.bind(null, structures),
    validator.bind(null),
);
