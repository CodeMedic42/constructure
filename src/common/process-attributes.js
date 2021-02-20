import Promise from 'bluebird';
import isNil from 'lodash/isNil';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import forEach from 'lodash/forEach';
import getWorstResultLevel from './get-worst-level';

function getPathAttribute() {
    throw new Error('TODO');
}

function runValidator(value, attributeValue, validator, requirements) {
    if (isNil(attributeValue) || isNil(validator)) {
        return {
            value: attributeValue,
            result: 'pass',
            message: null,
        };
    }

    return Promise.resolve(validator.run(
        context,
        value,
        attributeValue,
        requirements,
    )).then((validationResult) => {
        let result = 'pass';
        let message = null;

        if (!isNil(validationResult)) {
            message = validationResult.getMessage();
            result = validationResult.isFatal() ? 'fatal' : 'non-fatal';
        }

        return {
            value: attributeValue,
            result,
            message,
        };
    });
}

function processAttributes(context, value, attributes = {}, attributeResults = {}) {
    attributeResults.$r = null;
    attributeResults.$a = {};

    attributeResults.$r = Promise.all(map(attributes, (attribute, attributeId) => {
        let attributeValue = attribute.getValue();

        const attributeResultPromise = Promise.map(attribute.getRequirements().get(), (requirement) => {
            if (isNil(requirement.path)) {
                return Promise.resolve(attributeResults.$a[requirement.attribute]);
            }
    
            return getPathAttribute(requirement.path, requirement.attribute);
        }).then((requirements) => {
            let blocked = false;
            const requirementValues = [];

            forEach(
                requirements,
                (requirement) => {
                    blocked = requirement.result === 'fatal' || requirement.result === 'blocked';

                    requirementValues.push(requirement.value);

                    return !blocked;
                },
            );

            if (blocked) {
                return {
                    value: null,
                    result: 'blocked',
                    message: null,
                };
            }

            return Promise.resolve(attributeValue(context, value, requirementValues))
            .then((attributeValueResult) => {
                return runValidator(
                    value,
                    attributeValueResult || null,
                    attribute.getValidator(),
                    requirementValues,
                    attributeResults.$a);
            });
        })
        .then((attributeResult) => {
            attributeResults.$a[attributeId] = attributeResult;

            return attributeResult;
        })
        .catch((error) => {
            return {
                value: attributeValue,
                result: 'fatal',
                message: error.message,
            };
        });

        attributeResults.$a[attributeId] = attributeResultPromise;

        return attributeResultPromise.then((attributeResult) => {
            return attributeResult.result;
        });
    }))
    .then((results) => {
        return reduce(results, (acc, result) => getWorstResultLevel(acc, result), 'pass');
    })
    .then((finalResult) => {
        attributeResults.$r = finalResult;

        return finalResult;
    });

    return attributeResults;
}

export default processAttributes;
