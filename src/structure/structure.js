import Symbol from 'es6-symbol';
import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';
import Aspect from '../aspect/aspect';
import Runtime from '../runtime';
import processAspects from '../common/process-aspects';
import combineResults from '../common/combine-results';

const specialInternalAccessor = Symbol('structureSecret');

const FIELDS = {
    verifier: Symbol('verifier'),
    validator: Symbol('validator'),
    additionalStructure: Symbol('additionalStructure'),
    aspects: Symbol('aspects'),
};

function combineResultGroups(results, additionalResults) {
    if (isNil(additionalResults)) {
        return results;
    }

    const finalResults = results;

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

    finalResults.$r = combineResults([finalResults.$r, $r])
        .then((finalResultStatus) => {
            finalResults.$r = finalResultStatus;

            return finalResultStatus;
        });

    return finalResults;
}

class Structure {
    constructor(verifier) {
        this[FIELDS.verifier] = verifier;
        this[FIELDS.aspects] = {};
    }

    verify(value) {
        const additionalValidator = this[FIELDS.verifier](value);

        return (runtime) => {
            const results = processAspects(runtime, this[FIELDS.aspects]);

            const additionalResults = !isNil(additionalValidator)
                ? additionalValidator(runtime)
                : null;

            const finalResults = combineResultGroups(results, additionalResults);

            const thisValueGroup = runtime.getThis();

            thisValueGroup[specialInternalAccessor] = finalResults;

            return finalResults;
        };
    }

    aspect(id, aspectValue, options) {
        this[FIELDS.aspects][id] = aspectValue instanceof Aspect
            ? aspectValue
            : new Aspect(aspectValue, options);

        return this;
    }

    run(value, options = {}) {
        const validators = this.verify(value);

        const runtime = new Runtime(specialInternalAccessor, value, options);

        const aspectResults = validators(runtime);

        return aspectResults.$r.then(() => aspectResults);
    }
}

export default Structure;
