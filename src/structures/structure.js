import Symbol from 'es6-symbol';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
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

const FIELDS = {
    verifier: Symbol('verifier'),
    validator: Symbol('validator'),
    overrideStructure: Symbol('overrideStructure'),
};

class Structure {
    constructor(verifier, validator) {
        this[FIELDS.verifier] = verifier;
        this[FIELDS.validator] = validator;
        this[FIELDS.overrideStructure] = null;
    }

    verify(value) {
        this[FIELDS.overrideStructure] = this[FIELDS.verifier](value);
    }

    validate(context, value) {
        if (!isNil(this[FIELDS.overrideStructure])) {
            return this[FIELDS.overrideStructure].validate(context, value);
        }

        return this[FIELDS.validator](context, value);
    }

    run(value) {
        const context = {
            get: (path) => {
                if (isNil(path) || path.length <= 0) {
                    return value;
                }

                return get(value, path);
            },
        };

        this.verify(value);

        return this.validate(context, value);
    }
}

Structure.any = anyStructure(Structure);
Structure.string = stringStructure(Structure);
Structure.number = numberStructure(Structure);
Structure.boolean = booleanStructure(Structure);
Structure.shape = shapeStructure(Structure);
Structure.object = objectStructure(Structure);
Structure.array = arrayStructure(Structure);
Structure.objectOf = objectOfStructure(Structure);
Structure.arrayOf = arrayOfStructure(Structure);
Structure.oneOfType = oneOfTypeStructure(Structure);

export default Structure;
