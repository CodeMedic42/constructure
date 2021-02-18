/* eslint-disable no-param-reassign */
import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';
import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import set from 'lodash/set';
import get from 'lodash/get';
import getWorstResultLevel from './get-worst-level';

function getDefaultTo(obj, path, def) {
    const target = get(obj, path);

    if (!isNil(target)) {
        return target;
    }

    set(obj, path, def);

    return def;
}

function processAttributes(attributes, context, value, attributeResults = {}) {
    attributeResults.$r = null;
    attributeResults.$a = {};

    const waiting = {};

    forEach(attributes, (attribute, attributeId) => {
        let attributeValue = attribute;
        let validator = null;

        if (isArray(attribute)) {
            [attributeValue, validator] = attribute;
        }

        if (isFunction(attributeValue)) {
            attributeValue = attributeValue(context, value);
        }

        const attributeResult = {
            value: attributeValue,
            result: null,
            message: null,
        };

        attributeResults.$a[attributeId] = attributeResult;

        if (!isNil(attributeValue) && !isNil(validator)) {
            const requiredAttributes = {};
            let needs = 0;

            const execute = () => {
                let blocked = false;

                forEach(requiredAttributes, (requiredAttribute) => {
                    blocked = requiredAttribute.result === 'fatal' || requiredAttribute.result === 'blocked';

                    return !blocked;
                });

                if (!blocked) {
                    const validationResult = validator.run(
                        context,
                        value,
                        attributeValue,
                        requiredAttributes,
                    );

                    attributeResult.result = 'pass';

                    if (!isNil(validationResult)) {
                        attributeResult.message = validationResult.getMessage();
                        attributeResult.result = validationResult.isFatal() ? 'fatal' : 'non-fatal';
                    }

                    attributeResults.$r = getWorstResultLevel(
                        attributeResults.$r,
                        attributeResult.result,
                    );
                }

                forEach(waiting[attributeId], (callback) => callback(attributeResult));
            };

            forEach(validator.getRequirements(), (requirement) => {
                const requiredAttribute = attributeResults.$a[requirement];

                requiredAttributes[requirement] = requiredAttribute;

                if (isNil(requiredAttribute) || requiredAttribute.result === 'blocked') {
                    needs += 1;

                    const attributeWaitingCallbacks = getDefaultTo(waiting, requirement, []);

                    attributeWaitingCallbacks.push((nextAttribute) => {
                        requiredAttributes[requirement] = nextAttribute;

                        needs -= 1;

                        if (needs <= 0) {
                            execute();
                        }
                    });
                }
            });

            if (needs <= 0) {
                execute();
            } else {
                attributeResult.result = 'blocked';

                attributeResults.$r = getWorstResultLevel(
                    attributeResults.$r,
                    attributeResult.result,
                );
            }
        }
    });

    return attributeResults;
}

// module.exports = processAttributes;
export default processAttributes;
