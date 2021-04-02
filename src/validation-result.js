import Promise from 'bluebird';
import Symbol from 'es6-symbol';
import isNil from 'lodash/isNil';
import cloneDeep from 'lodash/cloneDeep';
import forEach from 'lodash/forEach';
import { clone, mapValues } from 'lodash';
import getWorstResult from './common/get-worst-result';
import Type from './type';

const FIELDS = {
    observedType: Symbol('observedType'),
    aspects: Symbol('aspects'),
    result: Symbol('result'),
    data: Symbol('data'),
    locked: Symbol('locked'),
};

function flattenResult(initialResult) {
    const output = {};

    const compressResult = (validationResult, path) => {
        output[path] = {
            $a: cloneDeep(validationResult[FIELDS.aspects]),
            $r: validationResult[FIELDS.result],
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
    constructor(observedType) {
        this[FIELDS.observedType] = observedType;
        this[FIELDS.locked] = false;
        this[FIELDS.aspects] = {};
        this[FIELDS.result] = 'pass';
        this[FIELDS.data] = null;

        const accessType = observedType.getAccessType();

        if (accessType === Type.ACCESS_TYPES.KEYED) {
            this[FIELDS.data] = {};
        } else if (accessType === Type.ACCESS_TYPES.INDEXED) {
            this[FIELDS.data] = [];
        }
    }

    mergeAspect(aspectId, aspectResult) {
        if (this[FIELDS.locked]) {
            throw new Error('Cannot update a locked Validation');
        }

        let aspectContainer = this[FIELDS.aspects][aspectId];

        if (isNil(aspectContainer)) {
            aspectContainer = [];

            this[FIELDS.aspects][aspectId] = aspectContainer;
        }

        aspectContainer.push(aspectResult);
    }

    mergeChild(childId, childValidationResult) {
        if (this[FIELDS.locked]) {
            throw new Error('Cannot update a locked Validation');
        }

        const existingChild = [FIELDS.data][childId];

        if (!isNil(existingChild)) {
            existingChild.merge(childValidationResult);
        } else {
            this[FIELDS.data][childId] = childValidationResult;
        }
    }

    merge(validationResult) {
        if (this[FIELDS.locked]) {
            throw new Error('Cannot update a locked Validation');
        }

        if (validationResult.getObservedType() !== this.getObservedType()) {
            // This should NEVER happen.
            throw new Error('Observed Types should match.');
        }

        forEach(validationResult[FIELDS.aspects], (aspectId, aspectResult) => {
            this.mergeAspect(aspectId, aspectResult);
        });

        forEach(validationResult[FIELDS.data], (childResult, childId) => {
            this.mergeChild(childId, childResult);
        });
    }

    lock() {
        this[FIELDS.locked] = true;

        const pendingResults = [];

        this[FIELDS.aspects] = mapValues(this[FIELDS.aspects], (aspectPromises, aspectId) => {
            forEach(aspectPromises, (aspectPromise) => {
                const aspectResultPromise = aspectPromise.then((aspectResult) => {
                    return aspectResult.result;
                });

                pendingResults.push(aspectResultPromise);
            });

            return Promise.all(aspectPromises).then((aspectResults) => {
                let aspectResult = aspectResults;

                if (aspectResult.length === 1) {
                    [aspectResult] = aspectResult;
                }

                this[FIELDS.aspects][aspectId] = aspectResult;

                return aspectResult;
            });
        });

        forEach(this[FIELDS.data], (childResult) => {
            pendingResults.push(childResult.getResult());
        });

        if (pendingResults.length > 0) {
            this[FIELDS.result] = Promise.all(pendingResults)
                .then((results) => {
                    const worst = getWorstResult(results);

                    this[FIELDS.result] = worst;

                    return worst;
                });
        }
    }

    getObservedType() {
        return this[FIELDS.observedType];
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
        };

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
