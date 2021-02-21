/* eslint-disable no-param-reassign */
import Promise from 'bluebird';
import isNil from 'lodash/isNil';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import forEach from 'lodash/forEach';
import slice from 'lodash/slice';
import findIndex from 'lodash/findIndex';
import getWorstResultLevel from './get-worst-level';
import getter from './getter';

function getFromThis(runtime, path, attribute) {
    if (!isNil(attribute)) {
        // Get attribute
        const attributeResults = getter(runtime.$this.attributeResults, slice(path, 1));

        return attributeResults.$a[attribute];
    }

    // Get Value
    return {
        value: getter(runtime.$this.value, slice(path, 1)),
        result: null,
    };
}

function getFromParent(runtime, path, attribute) {
    let lastIndex = 0;

    forEach(path, (segment, segmentIndex) => {
        if (segment === '$parent') {
            lastIndex = segmentIndex;

            // Keep looping
            return true;
        }

        // Stop looping
        return true;
    });

    lastIndex += 1;

    let targetPath = slice(runtime.absolutePath, 0, runtime.absolutePath.length - lastIndex);
    const extension = slice(path, lastIndex);

    targetPath = targetPath.concat(extension);

    if (!isNil(attribute)) {
        // Get attribute
        const attributeResults = getter(runtime.$root.attributeResults, targetPath);

        return attributeResults.$a[attribute];
    }

    // Get Value
    return {
        value: getter(runtime.$root.value, targetPath),
        result: null,
    };
}

function getFromRoot(runtime, path, attribute) {
    const finalPath = slice(path, 1);

    let fromIndex = 0;

    forEach(runtime.indexes, (runtimeIndex) => {
        const pathIndex = findIndex(path, (segment) => segment === '$index', fromIndex);

        finalPath[pathIndex] = runtimeIndex;
        fromIndex = pathIndex + 1;
    });

    if (!isNil(attribute)) {
        // Get attribute
        const attributeResults = getter(runtime.$root.attributeResults, finalPath);

        return attributeResults.$a[attribute];
    }

    // Get Value
    return {
        value: getter(runtime.$root.value, finalPath),
        result: null,
    };
}

function getRequirement(runtime, path, attribute) {
    if (path[0] === '$this') {
        return getFromThis(runtime, path, attribute);
    }

    if (path[0] === '$parent') {
        return getFromParent(runtime, path, attribute);
    }

    if (path[0] === '$root') {
        return getFromRoot(runtime, path, attribute);
    }

    throw new Error('Invalid requirement path');
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

// eslint-disable-next-line no-param-reassign
function processAttributes(runtime, attributes = {}, attributeResults = {}) {
    attributeResults.$r = null;
    attributeResults.$a = {};
    runtime.$this.attributeResults = attributeResults;

    attributeResults.$r = Promise.all(map(attributes, (attribute, attributeId) => {
        const attributeResultPromise = Promise.map(
            attribute.getRequirements().get(),
            (requirement) => {
                return getRequirement(runtime, requirement.path, requirement.attribute);
            },
        ).then((requirements) => {
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

            return Promise.resolve(attribute.getValue()(runtime.$this.value, requirementValues))
                .then((attributeValueResult) => {
                    return runValidator(
                        runtime.$this.value,
                        attributeValueResult || null,
                        attribute.getValidator(),
                        requirementValues,
                        attributeResults.$a,
                    );
                });
        })
            .then((attributeResult) => {
                attributeResults.$a[attributeId] = attributeResult;

                return attributeResult;
            })
            .catch((error) => {
                return {
                    value: null,
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
