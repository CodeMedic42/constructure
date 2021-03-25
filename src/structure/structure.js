import Promise from 'bluebird';
import Symbol from 'es6-symbol';
import shortid from 'shortid';
import Aspect from '../aspect/aspect';
import Runtime from '../runtime';
import processAspects from '../common/process-aspects';
import ValidationResult from '../validation-result';

const specialInternalAccessor = Symbol('structureSecret');

const FIELDS = {
    verifier: Symbol('verifier'),
    aspects: Symbol('aspects'),
};

class Structure {
    constructor(verifier, id = shortid.generate()) {
        this[FIELDS.id] = id;
        this[FIELDS.verifier] = verifier;
        this[FIELDS.aspects] = {};
    }

    verify(runtime, value) {
        const validationResult = this[FIELDS.verifier](runtime, value);

        if (!(validationResult instanceof ValidationResult)) {
            throw new Error('Verify must return a nil value or a function');
        }

        const results = processAspects(
            runtime,
            this[FIELDS.aspects],
            validationResult.getValueResult() !== 'pass',
        );

        validationResult.applyResults([results.$r]);
        validationResult.applyAspects(this[FIELDS.id], results.$a);

        const thisValueGroup = runtime.getThis();

        thisValueGroup[specialInternalAccessor] = validationResult;

        return validationResult;
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
        const runtime = new Runtime(specialInternalAccessor, value, options);

        const validationResult = this.verify(runtime, value);

        return Promise.resolve(validationResult.getResult()).then(() => {
            return validationResult;
        });
    }
}

export default Structure;
