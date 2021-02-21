import Symbol from 'es6-symbol';
import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';
import reduce from 'lodash/reduce';
import Attribute from '../attributes/attribute';
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
import getWorstResultLevel from '../common/get-worst-level';

const FIELDS = {
    verifier: Symbol('verifier'),
    validator: Symbol('validator'),
    additionalStructure: Symbol('additionalStructure'),
    attributes: Symbol('attributes'),
};

class Structure {
    constructor(verifier, validator) {
        this[FIELDS.verifier] = verifier;
        this[FIELDS.validator] = validator;
        this[FIELDS.additionalStructure] = null;
        this[FIELDS.attributes] = {};
    }

    verify(value) {
        this[FIELDS.additionalStructure] = this[FIELDS.verifier](value);
    }

    validate(runtime) {
        let additionalResults = null;

        if (!isNil(this[FIELDS.additionalStructure])) {
            // TODO should really run the other validator as well
            additionalResults = this[FIELDS.additionalStructure].validate(runtime);
        }

        const finalResults = this[FIELDS.validator](runtime, this[FIELDS.attributes]);

        if (!isNil(additionalResults)) {
            const {
                $a,
                $r,
                ...rest
            } = additionalResults;

            forEach($a, (attributeResult, attributeId) => {
                if (!isNil(finalResults[attributeId])) {
                    throw new Error(`Attribute ${attributeId} already exists`);
                }

                finalResults[attributeId] = attributeResult;
            });

            forEach(rest, (property, propertyId) => {
                if (!isNil(finalResults[propertyId])) {
                    throw new Error(`Property ${propertyId} already exists`);
                }

                finalResults[propertyId] = property;
            });

            finalResults.$r = Promise.all([finalResults.$r, $r])
                .then((results) => reduce(
                    results,
                    (acc, result) => getWorstResultLevel(acc, result),
                    null,
                )).then((finalResult) => {
                    finalResults.$r = finalResult;

                    return finalResult;
                });
        }

        return finalResults;
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
            absolutePath: [],
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
