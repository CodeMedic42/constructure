import Promise from 'bluebird';
import Symbol from 'es6-symbol';
import isNil from 'lodash/isNil';
import cloneDeep from 'lodash/cloneDeep';
import forEach from 'lodash/forEach';
import { clone } from 'lodash';
import getWorstResult from './common/get-worst-result';

const FIELDS = {
    aspects: Symbol('aspects'),
    result: Symbol('result'),
    value: Symbol('value'),
    data: Symbol('data'),
};

function flattenResult(initialResult) {
    const output = {};

    const compressResult = (validationResult, path) => {
        output[path] = {
            $a: cloneDeep(validationResult[FIELDS.aspects]),
            $r: validationResult[FIELDS.result],
            $v: {
                $r: validationResult[FIELDS.value].result,
                $m: validationResult[FIELDS.value].message,
            },
        };

        const data = validationResult[FIELDS.data];

        if (!isNil(data)) {
            forEach(data, (item, key) => {
                compressResult(item, path.length > 0 ? `${path}.${key}` : key);
            });
        }
    };

    compressResult(initialResult, '');

    return output;
}

class ValidationResult {
    constructor(result = 'pass', message = null) {
        this[FIELDS.aspects] = {};
        this[FIELDS.result] = result;
        this[FIELDS.data] = null;
        this[FIELDS.value] = {
            result,
            message,
        };
    }

    applyResults(pendingResults) {
        const p = pendingResults.concat(this[FIELDS.result]);

        this[FIELDS.result] = Promise.all(p)
            .then((results) => {
                const worst = getWorstResult(results);

                this[FIELDS.result] = worst;

                return worst;
            });
    }

    applyAspects(aspects) {
        forEach(aspects, (aspectResult, aspectId) => {
            if (!isNil(this[FIELDS.aspects][aspectId])) {
                throw new Error(`Aspect ${aspectId} already exists`);
            }

            this[FIELDS.aspects][aspectId] = aspectResult;
        });
    }

    setData(data) {
        this[FIELDS.data] = data;
    }

    setAspect(id, aspect) {
        this[FIELDS.aspects][id] = aspect;
    }

    getAspects() {
        return this[FIELDS.aspects];
    }

    getAspect(id) {
        return this[FIELDS.aspects][id];
    }

    getResult() {
        return this[FIELDS.result];
    }

    getValueResult() {
        return this[FIELDS.value].result;
    }

    getValueMessage() {
        return this[FIELDS.value].message;
    }

    getData() {
        return this[FIELDS.data];
    }

    toJS(flatten) {
        if (flatten) {
            return flattenResult(this);
        }

        const jsObj = {
            $a: cloneDeep(this[FIELDS.aspects]),
            $r: this[FIELDS.result],
            $v: {
                $r: this[FIELDS.value].result,
                $m: this[FIELDS.value].message,
            },
        };

        if (!isNil(this[FIELDS.message])) {
            jsObj.$m = this[FIELDS.message];
        }

        if (!isNil(this[FIELDS.data])) {
            const dataCopy = clone(this[FIELDS.data]);

            forEach(dataCopy, (item, key) => {
                dataCopy[key] = item.toJS();
            });

            jsObj.$d = dataCopy;
        }

        return jsObj;
    }
}

export default ValidationResult;
