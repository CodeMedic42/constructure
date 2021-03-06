import Promise from 'bluebird';
import Symbol from 'es6-symbol';
import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import Aspect from '../aspect/aspect';
import Runtime from '../runtime';
import processAspects from '../common/process-aspects';
import ValidationResult from '../validation-result';

const specialInternalAccessor = Symbol('structureSecret');

const FIELDS = {
    verifier: Symbol('verifier'),
    validator: Symbol('validator'),
    additionalStructure: Symbol('additionalStructure'),
    aspects: Symbol('aspects'),
};

class Structure {
    constructor(verifier) {
        this[FIELDS.verifier] = verifier;
        this[FIELDS.aspects] = {};
    }

    verify(value) {
        const additionalValidator = this[FIELDS.verifier](value);

        if (!isNil(additionalValidator) && !isFunction(additionalValidator)) {
            throw new Error('Verify must return a nil value or a function');
        }

        return (runtime) => {
            const results = processAspects(runtime, this[FIELDS.aspects]);

            const validationResult = !isNil(additionalValidator)
                ? additionalValidator(runtime)
                : new ValidationResult();

            validationResult.applyResults([results.$r]);
            validationResult.applyAspects(results.$a);

            const thisValueGroup = runtime.getThis();

            thisValueGroup[specialInternalAccessor] = validationResult;

            return validationResult;
        };
    }

    aspect(firstParam, aspectValue, options) {
        let aspect = null;

        if (firstParam instanceof Aspect) {
            aspect = firstParam;
        } else {
            aspect = new Aspect(firstParam, aspectValue, options);
        }

        const id = aspect.getId();

        this[FIELDS.aspects][id] = aspect;

        return this;
    }

    run(value, options = {}) {
        return Promise.try(() => {
            const validator = this.verify(value);

            const runtime = new Runtime(specialInternalAccessor, value, options);

            const aspectResults = validator(runtime);

            return aspectResults.getResult().then(() => {
                return aspectResults;
            });
        });
    }
}

export default Structure;
