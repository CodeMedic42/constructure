import Structure from './structure';
import anyStructure from './any-structure';
import stringStructure from './string-structure';
import numberStructure from './number-structure';
import booleanStructure from './boolean-structure';
import objectStructure from './object-structure';
import arrayStructure from './array-structure';
import oneOfTypeStructure from './one-of-type-structure';
import lazyStructure from './lazy-structure';
import dateStructure from './date-structure';
import nothingStructure from './nothing-structure';
import fromSchema from './from-schema';

const createStructure = (verifier, validator) => {
    return new Structure(verifier, validator);
};

createStructure.any = anyStructure;
createStructure.string = stringStructure;
createStructure.number = numberStructure;
createStructure.boolean = booleanStructure;
createStructure.object = objectStructure;
createStructure.array = arrayStructure;
createStructure.oneOfType = oneOfTypeStructure;
createStructure.lazy = lazyStructure;
createStructure.date = dateStructure;
createStructure.nothing = nothingStructure;
createStructure.fromSchema = fromSchema.bind(createStructure);

export default createStructure;
