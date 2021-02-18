const Symbol = require("es6-symbol");
const { isNil, get } = require('lodash');
const anyStructure = require('./any-structure');
const stringStructure = require('./string-structure');
const numberStructure = require('./number-structure');
const booleanStructure = require('./boolean-structure');
const shapeStructure = require('./shape-structure');
const objectStructure = require('./object-structure');
const arrayStructure = require('./array-structure');
const objectOfStructure = require('./object-of-structure');
const arrayOfStructure = require('./array-of-structure');
const oneOfTypeStructure = require('./one-of-type-structure');

const FIELDS = {
    verifier: Symbol('verifier'),
    validator: Symbol('validator'),
    overrideStructure: Symbol('overrideStructure'),
}

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
            }
        };

        this.verify(value);

        return this.validate(context, value);
    }
}

anyStructure(Structure);
stringStructure(Structure);
numberStructure(Structure);
booleanStructure(Structure);
shapeStructure(Structure);
objectStructure(Structure);
arrayStructure(Structure);
objectOfStructure(Structure);
arrayOfStructure(Structure);
oneOfTypeStructure(Structure);

module.exports = Structure;