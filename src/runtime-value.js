import Symbol from 'es6-symbol';

const FIELDS = {
    value: Symbol('value'),
    secret: Symbol('runtimeValueSecret'),
};

class RuntimeValue {
    constructor(specialInternalAccessor, value) {
        this[FIELDS.secret] = specialInternalAccessor;
        this[FIELDS.value] = value;
        this[specialInternalAccessor] = null;
    }

    getValue() {
        return this[FIELDS.value];
    }

    getResults() {
        return this[this[FIELDS.secret]];
    }
}

export default RuntimeValue;
