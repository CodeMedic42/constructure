import isNil from 'lodash/isNil';
import Structure from './structure';

function verifier(callback, value) {
    if (isNil(value)) {
        // Notice that we are not calling the callback to get the structure here.
        // If we used the structure here we could end up in an infinite loop.
        return null;
    }

    // We have a value of which we can check. Let's ge the structure and evaluate it.
    const structure = callback();

    if (isNil(structure)) {
        throw new Error('Lazy structure callbacks must return a structure.');
    }

    return structure.verify(value);
}

export default (callback) => new Structure(verifier.bind(null, callback));
