import Symbol from 'es6-symbol';

const FIELDS = {
    id: Symbol('id'),
    verifier: Symbol('verifier'),
    accessType: Symbol('accessType'),
};

class Type {
    constructor(id, verifier, accessType) {
        this[FIELDS.id] = id;
        this[FIELDS.verifier] = verifier;
        this[FIELDS.accessType] = accessType;
    }

    verify(value) {
        return this[FIELDS.verifier](value);
    }

    getAccessType() {
        return this[FIELDS.accessType];
    }

    getId() {
        return this[FIELDS.id];
    }
}

Type.ACCESS_TYPES = {
    UNKNOWN: 'unknown',
    UNDEFINED: 'undefined',
    SIMPLE: 'simple',
    KEYED: 'keyed',
    INDEXED: 'indexed',
};

export default Type;
