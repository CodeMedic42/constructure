import isNil from 'lodash/isNil';
// import forEach from 'lodash/forEach';
// import reduce from 'lodash/reduce';
// import processAttributes from '../common/process-attributes';
// import getWorstResultLevel from '../common/get-worst-level';

function verifier(callback, value) {
    if (isNil(value)) {
        return null;
    }

    const structure = callback();

    if (isNil(structure)) {
        throw new Error('Lazy structure callbacks must return a structure.');
    }

    structure.verify(value);

    return structure;
}

function validator(
    // valueType, context, attributes
) {
    throw new Error('Not ready yet');
    // const results = processAttributes(runtime, attributes);

    // return reduce(value, (acc, propertyValue, propertyId) => {
    //     const propertyResults = valueType.validate(context, propertyValue);

    //     acc.$r = getWorstResultLevel(acc.$r, propertyResults.$r);

    //     acc[propertyId] = propertyResults;

    //     return acc;
    // }, results);
}

export default (Structure) => (callback) => new Structure(
    verifier.bind(null, callback),
    validator.bind(null, callback),
);
