import Symbol from 'es6-symbol';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import Attribute from '../attributes/attribute.js';
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

const FIELDS = {
    verifier: Symbol('verifier'),
    validator: Symbol('validator'),
    overrideStructure: Symbol('overrideStructure'),
    attributes: Symbol('attributes'),
};

class Structure {
    constructor(verifier, validator) {
        this[FIELDS.verifier] = verifier;
        this[FIELDS.validator] = validator;
        this[FIELDS.overrideStructure] = null;
        this[FIELDS.attributes] = {};
    }

    verify(value) {
        this[FIELDS.overrideStructure] = this[FIELDS.verifier](value);
    }

    validate(runtime) {
        if (!isNil(this[FIELDS.overrideStructure])) {
            // TODO should really run the other validator as well
            return this[FIELDS.overrideStructure].validate(runtime);
        }

        return this[FIELDS.validator](runtime, this[FIELDS.attributes]);
    }

    attributes(attributes) {
        this[FIELDS.attributes] = attributes || {};

        return this;
    }

    run(value) {
        this.verify(value);

        const runtime = {
            $root: {
                value,
                attributeResults: null,
            },
            $this: {
                value,
                attributeResults: null,
            },
            absolutePath: []
        };

        const attributeResults = this.validate(runtime);

        runtime.$root.attributeResults = attributeResults;
        runtime.$this.attributeResults = attributeResults;

        return attributeResults.$r.then(() => attributeResults);
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
Structure.lazy = lazyStructure(Structure);

Structure.attribute = (attributeValue) => {
    return new Attribute(attributeValue);
};

export default Structure;
