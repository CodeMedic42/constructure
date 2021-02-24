import Symbol from 'es6-symbol';
import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';
import merge from 'lodash/merge';
import reduce from 'lodash/reduce';
import getWorstResultLevel from '../common/get-worst-level';
import Aspect from '../aspect/aspect';

const FIELDS = {
    verifier: Symbol('verifier'),
    validator: Symbol('validator'),
    additionalStructure: Symbol('additionalStructure'),
    aspects: Symbol('aspects'),
};

const DEFAULT_OPTIONS = {
    maxPathDepth: 1000,
};

class Structure {
    constructor(verifier, validator) {
        this[FIELDS.verifier] = verifier;
        this[FIELDS.validator] = validator;
        this[FIELDS.additionalStructure] = null;
        this[FIELDS.aspects] = {};
    }

    verify(value) {
        this[FIELDS.additionalStructure] = this[FIELDS.verifier](value);
    }

    validate(runtime) {
        let additionalResults = null;

        if (!isNil(this[FIELDS.additionalStructure])) {
            additionalResults = this[FIELDS.additionalStructure].validate(runtime);
        }

        const finalResults = this[FIELDS.validator](runtime, this[FIELDS.aspects]);

        if (!isNil(additionalResults)) {
            const {
                $a,
                $r,
                ...rest
            } = additionalResults;

            forEach($a, (aspectResult, aspectId) => {
                if (!isNil(finalResults[aspectId])) {
                    throw new Error(`Aspect ${aspectId} already exists`);
                }

                finalResults.$a[aspectId] = aspectResult;
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

        // eslint-disable-next-line no-param-reassign
        runtime.$this.aspectResults = finalResults;

        return finalResults;
    }

    aspect(id, aspectValue, options) {
        this[FIELDS.aspects][id] = aspectValue instanceof Aspect
            ? aspectValue
            : new Aspect(aspectValue, options);

        return this;
    }

    run(value, options = {}) {
        this.verify(value);

        const runtime = {
            $root: {
                value,
                aspectResults: null,
            },
            $this: {
                value,
                aspectResults: null,
            },
            absolutePath: [],
            options: merge({}, DEFAULT_OPTIONS, options),
        };

        const aspectResults = this.validate(runtime);

        runtime.$root.aspectResults = aspectResults;
        runtime.$this.aspectResults = aspectResults;

        return aspectResults.$r.then(() => aspectResults);
    }
}

export default Structure;
