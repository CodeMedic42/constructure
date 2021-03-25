import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';
import isBoolean from 'lodash/isBoolean';
import isPlainObject from 'lodash/isPlainObject';
import Structure from './structure';
import ValidationResult from '../validation-result';
import getOption from '../common/get-option';
import typeVerify from '../common/type-verify';

function valueVerifier(value, allowNull) {
    return typeVerify(value, allowNull, isPlainObject, 'Must be an object');
}

function basicObjectVerifier(options, runtime, value) {
    const allowNull = getOption('allowNull', options, runtime.getOptions());

    return valueVerifier(value, allowNull);
}

// function regExVerifier(patterns, exact, rest, options, runtime, value) {
//     const allowNull = getOption('allowNull', options, runtime.getOptions());

//     const validationResult = valueVerifier(value, allowNull);

//     const groupResults = [];
//     const childResults = {};

//     forEach(value, (childValue, childValueId) => {
//         const targetPatternItem = patterns.find(
//             (patternItem) => childValueId.match(patternItem.pattern),
//         );

//         const childRuntime = runtime.branch(childValueId);
//         let childValidationResult = null;

//         if (isNil(targetPatternItem)) {
//             if (!isNil(rest)) {
//                 childValidationResult = rest.verify(childRuntime, childValue);
//             } else if (exact) {
//                 childValidationResult =
// new ValidationResult('fatal', `The property ${childValueId} is invalid`);
//             }
//         } else {
//             childValidationResult = targetPatternItem.structure.verify(childRuntime, childValue);
//         }

//         groupResults.push(childValidationResult.getResult());
//         childResults[childValueId] = childValidationResult;
//     });

//     validationResult.applyResults(groupResults);
//     validationResult.setData(childResults);

//     return validationResult;
// }

function shapeVerifier(properties, exact, patterns, rest, options, runtime, value) {
    const force = getOption('force', options, runtime.getOptions());
    const allowNull = getOption('allowNull', options, runtime.getOptions());

    const validationResult = valueVerifier(value, allowNull);

    let target = value;

    if (isNil(value) || validationResult.getValueResult() !== 'pass') {
        if (force === true) {
            target = {};
        } else {
            return validationResult;
        }
    }

    const groupResults = [];
    const childResults = {};

    // if (!isNil(patterns)) {

    // }

    let handleExtra = null;

    if (rest instanceof Structure) {
        handleExtra = (childRuntime, childValue) => {
            return rest.verify(childRuntime, childValue);
        };
    } else if (isPlainObject(rest)) {
        handleExtra = (childRuntime, childValue, childValueId) => {
            const targetPatternItem = rest.find(
                (patternItem) => childValueId.match(patternItem.pattern),
            );

            if (isNil(targetPatternItem)) {
                if (!isNil(rest)) {
                    childValidationResult = rest.verify(childRuntime, childValue);
                } else if (exact) {
                    childValidationResult = new ValidationResult('fatal', `The property ${childValueId} is invalid`);
                }
            } else {
                childValidationResult = targetPatternItem.structure.verify(childRuntime, childValue);
            }
        };
    } else if (exact) {
        handleExtra = (childRuntime, childValue, childValueId) => {
            return new ValidationResult('fatal', `The property ${childValueId} is invalid`);
        };
    }

    if (!isNil(handleExtra)) {
        forEach(target, (childValue, childValueId) => {
            const childRuntime = runtime.branch(childValueId);

            if (isNil(properties[childValueId])) {
                const childValidationResult = handleExtra(childRuntime, childValue, childValueId);

                groupResults.push(childValidationResult.getResult());
                childResults[childValueId] = childValidationResult;
            }
        });
    }

    forEach(properties, (childStructure, childStructureId) => {
        const childRuntime = runtime.branch(childStructureId);

        const childValidationResult = childStructure.verify(childRuntime, target[childStructureId]);

        groupResults.push(childValidationResult.getResult());
        childResults[childStructureId] = childValidationResult;
    });

    validationResult.applyResults(groupResults);
    validationResult.setData(childResults);

    return validationResult;
}

export default (structure, options) => {
    let verifier = null;
    let exact = false;
    let rest = null;
    let force = null;
    let allowNull = null;
    let patterns = null;

    if (!isNil(options)) {
        if (isBoolean(options)) {
            exact = options === true;
        } else if (options instanceof Structure) {
            rest = options;
        } else {
            ({
                exact = exact,
                rest = rest,
                force = force,
                allowNull = allowNull,
                patterns = patterns,
            } = options);
        }
    }

    if (isNil(structure)) {
        verifier = basicObjectVerifier.bind(null, { force, allowNull });
    } else if (structure instanceof Structure) {
        verifier = shapeVerifier.bind(null, {}, false, null, structure, { force, allowNull });
    } else if (isArray(structure)) {
        verifier = shapeVerifier.bind(null, {}, false, structure, null, { force, allowNull });
    } else if (isPlainObject(structure)) {
        verifier = shapeVerifier.bind(null, structure, exact, patterns, rest, { force, allowNull });
    } else {
        throw new Error('Invalid parameters for object structure');
    }

    return new Structure(verifier);
};

/*
Object()
Object(Structure)
Object(Shape)
Object({
    properties,
    patterns,
    exact,
    force,
    rest,
    allowNull,
})

const structure = Structure
    .id('')
    .keyed({
        properties: {
            key: structure
        },
        patterns({
            group: [{
                pattern: regEx,
                structure: structure
            }],
            match: 'any' || 'one' || 'first',
            notInProperties: true,
        },
        additional: structure,
        unevaluated: true,
    })
    .indexed({
        items: [structure, [structure, 2]],
        additional: structure,
        unevaluated: true,
    })
    .allOf([])
    .anyOf([])
    .oneOf([])
    .aspect('type', 'string')
    .aspect('type', () => {}, requires)
    .aspect(Aspect({
        id: 'A',
        types: ['string', 'fooType'],
        value: () => {},
        validator: {
            onValidate: () => {},
            fatal: true,
        },
        requires: ['', ''],
    }))
    .aspect(Aspect({
        id: 'B',
        types: ['object'],
        value: () => {},
        validator: {
            onValidate: () => {},
            fatal: true,
        },
        requires: ['', ''],
    }));

    structure.run(structure, {
        determineType: null,
        types: {
            fooType: Type(verifierCallback, 'simple || keyed || indexed')
        }
    });
*/
