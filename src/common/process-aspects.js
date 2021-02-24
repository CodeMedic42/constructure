import Promise from "bluebird";
import isNil from "lodash/isNil";
import map from "lodash/map";
import reduce from "lodash/reduce";
import forEach from "lodash/forEach";
import slice from "lodash/slice";
import findIndex from "lodash/findIndex";
import getWorstResultLevel from "./get-worst-level";
import getter from "./getter";

function getFromThis(runtime, path, aspect) {
  if (!isNil(aspect)) {
    // Get aspect
    const aspectResults = getter(runtime.$this.aspectResults, slice(path, 1));

    return aspectResults.$a[aspect];
  }

  // Get Value
  return {
    value: getter(runtime.$this.value, slice(path, 1)),
    result: null,
  };
}

function getFromParent(runtime, path, aspect) {
  let lastIndex = 0;

  forEach(path, (segment, segmentIndex) => {
    if (segment === "$parent") {
      lastIndex = segmentIndex;

      // Keep looping
      return true;
    }

    // Stop looping
    return true;
  });

  lastIndex += 1;

  let targetPath = slice(
    runtime.absolutePath,
    0,
    runtime.absolutePath.length - lastIndex
  );
  const extension = slice(path, lastIndex);

  targetPath = targetPath.concat(extension);

  if (!isNil(aspect)) {
    // Get aspect
    const aspectResults = getter(runtime.$root.aspectResults, targetPath);

    return aspectResults.$a[aspect];
  }

  // Get Value
  return {
    value: getter(runtime.$root.value, targetPath),
    result: null,
  };
}

function getFromRoot(runtime, path, aspect) {
  const finalPath = slice(path, 1);

  let fromIndex = 0;

  forEach(runtime.indexes, (runtimeIndex) => {
    const pathIndex = findIndex(
      path,
      (segment) => segment === "$index",
      fromIndex
    );

    finalPath[pathIndex] = runtimeIndex;
    fromIndex = pathIndex + 1;
  });

  if (!isNil(aspect)) {
    // Get aspect
    const aspectResults = getter(runtime.$root.aspectResults, finalPath);

    return aspectResults.$a[aspect];
  }

  // Get Value
  return {
    value: getter(runtime.$root.value, finalPath),
    result: null,
  };
}

function getRequirement(runtime, path, aspect) {
  if (path[0] === "$this") {
    return getFromThis(runtime, path, aspect);
  }

  if (path[0] === "$parent") {
    return getFromParent(runtime, path, aspect);
  }

  if (path[0] === "$root") {
    return getFromRoot(runtime, path, aspect);
  }

  throw new Error("Invalid requirement path");
}

function runValidator(value, aspectValue, validator, requirements) {
  if (isNil(aspectValue) || isNil(validator)) {
    return {
      value: aspectValue,
      result: "pass",
      message: null,
    };
  }

  return validator
    .run(value, aspectValue, requirements)
    .then((validationResult) => {
      let result = "pass";
      let message = null;

      if (!isNil(validationResult)) {
        message = validationResult.getMessage();
        result = validationResult.isFatal() ? "fatal" : "non-fatal";
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
        aspect.getRequirements().get(),
        (requirement) => {
          return getRequirement(runtime, requirement.path, requirement.aspect);
        }
      )
        .then((requirements) => {
          let blocked = false;
          const requirementValues = [];

          forEach(requirements, (requirement) => {
            blocked =
              requirement.result === "fatal" ||
              requirement.result === "blocked";

            requirementValues.push(requirement.value);

            return !blocked;
          });

          if (blocked) {
            return {
              value: null,
              result: "blocked",
              message: null,
            };
          }

          return Promise.resolve(
            aspect.getValue()(runtime.$this.value, requirementValues)
          ).then((aspectValueResult) => {
            return runValidator(
              runtime.$this.value,
              aspectValueResult || null,
              aspect.getValidator(),
              requirementValues,
              runtime.$this.aspectResults.$a
            );
          });
        })
        .then((aspectResult) => {
          // eslint-disable-next-line no-param-reassign
          runtime.$this.aspectResults.$a[aspectId] = aspectResult;

          return aspectResult;
        })
        .catch((error) => {
          return {
            value: null,
            result: "fatal",
            message: error.message,
          };
        });

      aspectPromises[aspectId] = aspectResultPromise;

      return aspectResultPromise.then((aspectResult) => {
        return aspectResult.result;
      });
    })
  )
    .then((results) => {
      return reduce(
        results,
        (acc, result) => getWorstResultLevel(acc, result),
        "pass"
      );
    })
    .then((finalResult) => {
      // eslint-disable-next-line no-param-reassign
      runtime.$this.aspectResults.$r = finalResult;

      return finalResult;
    });

  return {
    $a: aspectPromises,
    $r: aspectGroupResultPromise,
  };
}

export default processAspects;
