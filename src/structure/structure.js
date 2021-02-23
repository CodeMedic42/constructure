import Symbol from 'es6-symbol';
import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';
import reduce from 'lodash/reduce';
import { isFunction, isPlainObject } from 'lodash';
import getWorstResultLevel from '../common/get-worst-level';
import Attribute from '../attribute/attribute';

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
        // this[FIELDS.aspects] = {};
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

                finalResults.$a[attributeId] = attributeResult;
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
        runtime.$this.attributeResults = finalResults;

        return finalResults;
    }

    aspect(id, aspectValue, options) {
        let attribute = null;

        if (aspectValue instanceof Attribute) {
            attribute = aspectValue;
        } else {
            attribute = new Attribute(aspectValue);

            if (!isNil(options)) {
                let onValidate = null;
                let isFatal = true;

                if (isPlainObject(options.validator)) {
                    ({ onValidate, isFatal } = options.validator);
                } else {
                    onValidate = options.validator;
                }

                if (isFunction(onValidate)) {
                    attribute = attribute.setValidator(onValidate, isFatal === true);
                }

                if (!isNil(options.requirements)) {
                    attribute = attribute.setRequirements(options.requirements);
                }
            }
        }

        this[FIELDS.attributes][id] = attribute;

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

export default Structure;
