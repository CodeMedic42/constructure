import Promise from 'bluebird';
import isNil from 'lodash/isNil';
import map from 'lodash/map';
import forEach from 'lodash/forEach';
import slice from 'lodash/slice';
import isString from 'lodash/isString';
import findIndex from 'lodash/findIndex';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import getWorstResult from './get-worst-result';

function getter(target, path, defaultValue) {
    if (path.length <= 0) {
        if (isUndefined(target)) {
            return defaultValue;
        }

        return target;
    }

    return get(target, path, defaultValue);
}

function getResultFromPath(result, path) {
    let target = result;

    forEach(path, (segment) => {
        const data = target.getData();

        if (isNil(data)) {
            target = undefined;

            return false;
        }

        target = data[segment];

        return true;
    });

    return target;
}

function getFromThis(runtime, path, aspect) {
    // removes "$this" which is the first item.
    const targetPath = slice(path, 1);

    if (!isNil(aspect)) {
        // Get aspect
        const aspectResults = getResultFromPath(runtime.getThis().getResults(), targetPath);

        return aspectResults.getAspect(aspect);
    }

    // Get Value
    return {
        value: getter(runtime.getThis().getValue(), targetPath),
        result: null,
    };
}

function getFromParent(runtime, path, aspect) {
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

    const absolutePath = runtime.getAbsolutePath();

    let targetPath = slice(
        absolutePath,
        0,
        absolutePath.length - lastIndex,
    );
    const extension = slice(path, lastIndex);

    targetPath = targetPath.concat(extension);

    if (!isNil(aspect)) {
        const results = runtime.getRoot().getResults();

        // Get aspect
        const aspectResults = getResultFromPath(results, targetPath);

        return aspectResults.getAspect(aspect);
    }

    // Get Value
    return {
        value: getter(runtime.getRoot().getValue(), targetPath),
        result: null,
    };
}

function getFromRoot(runtime, path, aspect) {
    const finalPath = slice(path, 1);

    let fromIndex = 0;

    forEach(runtime.indexes, (runtimeIndex) => {
        const pathIndex = findIndex(
            path,
            (segment) => segment === '$index',
            fromIndex,
        );

        finalPath[pathIndex] = runtimeIndex;
        fromIndex = pathIndex + 1;
    });

    if (!isNil(aspect)) {
        // Get aspect
        const aspectResults = getResultFromPath(runtime.getRoot().getResults(), finalPath);

        return aspectResults.getAspect(aspect);
    }

    // Get Value
    return {
        value: getter(runtime.getRoot().getValue(), finalPath),
        result: null,
    };
}

function getRequirement(runtime, path, aspect) {
    if (path[0] === '$this') {
        return getFromThis(runtime, path, aspect);
    }

    if (path[0] === '$parent') {
        return getFromParent(runtime, path, aspect);
    }

    if (path[0] === '$root') {
        return getFromRoot(runtime, path, aspect);
    }

    throw new Error('Invalid requirement path');
}

function runValidator(value, aspectValue, validator, fatal, requirements) {
    if (isNil(aspectValue) || isNil(validator)) {
        return {
            value: aspectValue,
            result: 'pass',
            message: null,
        };
    }

    return Promise.resolve(validator(value, aspectValue, requirements))
        .then((resultMessage) => {
            let result = 'pass';
            let message = null;

            if (isString(resultMessage)) {
                message = resultMessage;
                result = fatal ? 'fatal' : 'non-fatal';
            }

            return {
                value: aspectValue,
                result,
                message,
            };
        });
}

function processAspects(runtime, aspects = {}) {
    const aspectPromises = {};

    const aspectGroupResultPromise = Promise.all(
        map(aspects, (aspect, aspectId) => {
            const aspectResultPromise = Promise.map(
                aspect.getRequirements(),
                (requirement) => {
                    return getRequirement(runtime, requirement.path, requirement.aspect);
                },
            )
                .then((requirements) => {
                    let blocked = false;
                    const requirementValues = [];

                    forEach(requirements, (requirement) => {
                        blocked = requirement.result === 'fatal'
                || requirement.result === 'blocked';

                        requirementValues.push(requirement.value);

                        return !blocked;
                    });

                    if (blocked) {
                        return {
                            value: null,
                            result: 'blocked',
                            message: null,
                        };
                    }

                    return Promise.resolve(
                        aspect.getValue()(runtime.getThis().getValue(), requirementValues),
                    ).then((aspectValueResult) => {
                        return runValidator(
                            runtime.getThis().getValue(),
                            aspectValueResult,
                            aspect.getOnValidate(),
                            aspect.getFatal(),
                            requirementValues,
                        );
                    });
                })
                .then((aspectResult) => {
                    runtime.getThis().getResults().setAspect(aspectId, aspectResult);

                    return aspectResult;
                })
                .catch((error) => {
                    return {
                        value: null,
                        result: 'fatal',
                        message: error.message,
                    };
                });

            aspectPromises[aspectId] = aspectResultPromise;

            return aspectResultPromise.then((aspectResult) => {
                return aspectResult.result;
            });
        }),
    )
        .then((results) => {
            return getWorstResult(results);
        });

    return {
        $a: aspectPromises,
        $r: aspectGroupResultPromise,
    };
}

export default processAspects;
