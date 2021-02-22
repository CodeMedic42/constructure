import Structure from './structure';
import anyStructure from './any-structure';
import stringStructure from './string-structure';
import numberStructure from './number-structure';
import booleanStructure from './boolean-structure';
import shapeStructure from './shape-structure';
import objectStructure from './object-structure';
import arrayStructure from './array-structure';
import objectOfStructure from './object-of-structure';
import arrayOfStructure from './array-of-structure';
import oneOfTypeStructure from './one-of-type-structure';
import lazyStructure from './lazy-structure';
import dateStructure from './date-structure';

const createStructure = (verifier, validator) => {
    return new Structure(verifier, validator);
};

createStructure.any = anyStructure;
createStructure.string = stringStructure;
createStructure.number = numberStructure;
createStructure.boolean = booleanStructure;
createStructure.shape = shapeStructure;
createStructure.object = objectStructure;
createStructure.array = arrayStructure;
createStructure.objectOf = objectOfStructure;
createStructure.arrayOf = arrayOfStructure;
createStructure.oneOfType = oneOfTypeStructure;
createStructure.lazy = lazyStructure;
createStructure.date = dateStructure;

export default createStructure;
