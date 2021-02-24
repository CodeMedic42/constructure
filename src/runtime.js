import Symbol from 'es6-symbol';
import isNil from 'lodash/isNil';
import isNumber from 'lodash/isNumber';
import merge from 'lodash/merge';
import RuntimeValue from './runtime-value';

const FIELDS = {
    root: Symbol('root'),
    this: Symbol('this'),
    options: Symbol('options'),
    absolutePath: Symbol('absolutePath'),
    dynamicSegments: Symbol('dynamicSegments'),
    secret: Symbol('runtimeSecret'),
};

const DEFAULT_OPTIONS = {
    maxPathDepth: 1000,
};

class Runtime {
    constructor(specialInternalAccessor, value, options) {
        if (isNil(specialInternalAccessor)) {
            return;
        }

        this[FIELDS.secret] = specialInternalAccessor;
        this[FIELDS.root] = new RuntimeValue(specialInternalAccessor, value);
        this[FIELDS.this] = this[FIELDS.root];
        this[FIELDS.absolutePath] = [];
        this[FIELDS.dynamicSegments] = [];
        this[FIELDS.options] = merge({}, DEFAULT_OPTIONS, options);
    }

    getRoot() {
        return this[FIELDS.root];
    }

    getThis() {
        return this[FIELDS.this];
    }

    getAbsolutePath() {
        return this[FIELDS.absolutePath];
    }

    branch(segment) {
        const absolutePath = this[FIELDS.absolutePath];

        if (absolutePath.length >= this[FIELDS.options].maxPathDepth) {
            throw new Error('Possible infinite loop detected');
        }

        const value = this[FIELDS.this].getValue();

        let dynamicSegments = this[FIELDS.dynamicSegments];

        if (isNumber(segment)) {
            dynamicSegments = dynamicSegments.concat(segment);
        }

        const branch = new Runtime();

        branch[FIELDS.secret] = this[FIELDS.secret];
        branch[FIELDS.root] = this[FIELDS.root];
        branch[FIELDS.options] = this[FIELDS.options];
        branch[FIELDS.this] = new RuntimeValue(
            this[FIELDS.secret],
            !isNil(value) ? value[segment] : value,
        );
        branch[FIELDS.dynamicSegments] = dynamicSegments;
        branch[FIELDS.absolutePath] = absolutePath.concat(segment);

        return branch;
    }
}

export default Runtime;
