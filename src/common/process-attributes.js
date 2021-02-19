/* eslint-disable no-param-reassign */
import Promise from 'bluebird';
import isNil from 'lodash/isNil';
import map from 'lodash/map';
import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import reduce from 'lodash/reduce';
// import set from 'lodash/set';
// import get from 'lodash/get';
import find from 'lodash/find';
import getWorstResultLevel from './get-worst-level';
import { isUndefined } from 'lodash';

// function getDefaultTo(obj, path, def) {
//     const target = get(obj, path);

//     if (!isNil(target)) {
//         return target;
//     }

//     set(obj, path, def);

//     return def;
// }

// function processAttributes(attributes, context, value, attributeResults = {}) {
//     attributeResults.$r = null;
//     attributeResults.$a = {};

//     const waiting = {};

//     forEach(attributes, (attribute, attributeId) => {
//         let attributeValue = attribute;
//         let validator = null;

//         if (isArray(attribute)) {
//             [attributeValue, validator] = attribute;
//         }

//         if (isFunction(attributeValue)) {
//             attributeValue = attributeValue(context, value);
//         }

//         const attributeResult = {
//             value: attributeValue,
//             result: null,
//             message: null,
//         };

//         attributeResults.$a[attributeId] = attributeResult;

//         if (!isNil(attributeValue) && !isNil(validator)) {
//             const requiredAttributes = {};
//             let needs = 0;

//             const execute = () => {
//                 let blocked = false;

//                 forEach(requiredAttributes, (requiredAttribute) => {
//                     blocked =
// requiredAttribute.result === 'fatal' || requiredAttribute.result === 'blocked';

//                     return !blocked;
//                 });

//                 if (!blocked) {
//                     const validationResult = validator.run(
//                         context,
//                         value,
//                         attributeValue,
//                         requiredAttributes,
//                     );

//                     attributeResult.result = 'pass';

//                     if (!isNil(validationResult)) {
//                         attributeResult.message = validationResult.getMessage();
//                         attributeResult.result = validationResult.isFatal()
// ? 'fatal' : 'non-fatal';
//                     }

//                     attributeResults.$r = getWorstResultLevel(
//                         attributeResults.$r,
//                         attributeResult.result,
//                     );
//                 }

//                 forEach(waiting[attributeId], (callback) => callback(attributeResult));
//             };

//             forEach(validator.getRequirements(), (requirement) => {
//                 const requiredAttribute = attributeResults.$a[requirement];

//                 requiredAttributes[requirement] = requiredAttribute;

//                 if (isNil(requiredAttribute) || requiredAttribute.result === 'blocked') {
//                     needs += 1;

//                     const attributeWaitingCallbacks = getDefaultTo(waiting, requirement, []);

//                     attributeWaitingCallbacks.push((nextAttribute) => {
//                         requiredAttributes[requirement] = nextAttribute;

//                         needs -= 1;

//                         if (needs <= 0) {
//                             execute();
//                         }
//                     });
//                 }
//             });

//             if (needs <= 0) {
//                 execute();
//             } else {
//                 attributeResult.result = 'blocked';

//                 attributeResults.$r = getWorstResultLevel(
//                     attributeResults.$r,
//                     attributeResult.result,
//                 );
//             }
//         }
//     });

//     return attributeResults;
// }

function getPathAttribute() {
    throw new Error('TODO');
}

function runValidator(value, attributeValue, validator, requirements, internalAttributes) {
    if (isNil(attributeValue) || isNil(validator)) {
        return {
            value: attributeValue || null,
            result: null,
            message: null,
        };
    }

    return Promise.map(requirements.get(), (requirement) => {
        if (isNil(requirement.path)) {
            return Promise.resolve(internalAttributes[requirement.attribute]);
        }

        return getPathAttribute(requirement.path, requirement.attribute);
    }).then((requiredAttributes) => {
        const blocked = !isNil(find(
            requiredAttributes,
            (requiredAttribute) => requiredAttribute.result === 'fatal' || requiredAttribute.result === 'blocked',
        ));

        let result = 'blocked';
        let message = null;

        if (!blocked) {
            return Promise.resolve(validator.run(
                context,
                value,
                attributeValue,
                requiredAttributes,
            )).then((validationResult) => {
                result = 'pass';

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
        let validator = null;

        if (isArray(attribute)) {
            [attributeValue, validator] = attribute;
        }

        const attributeResultPromise = Promise.resolve(attributeValue(context, value))
        .then((attributeValueResult) => {
            return runValidator(
                value,
                attributeValueResult,
                attribute.getValidator(),
                attribute.getRequirements(),
                attributeResults.$a);
        })
        .then((attributeResult) => {
            attributeResults.$a[attributeId] = attributeResult;

            return attributeResult;
        }).catch((error) => {
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
        return reduce(results, (acc, result) => getWorstResultLevel(acc, result), null);
    })
    .then((finalResult) => {
        attributeResults.$r = finalResult;

        return finalResult;
    });

    return attributeResults;
}

// module.exports = processAttributes;
export default processAttributes;
