import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';
import Structure from './structure';

function verifier(structures, value) {
    let structureValidator = null;

    forEach(structures, (structure) => {
        try {
            structureValidator = structure.verify(value);

            return false;
        } catch {
            // We are just going to ignore this for now.
        }

        return true;
    });

    if (isNil(structureValidator)) {
        throw new Error('Must match one of the given structures');
    }

    return structureValidator;
}

export default (structures) => new Structure(verifier.bind(null, structures));
