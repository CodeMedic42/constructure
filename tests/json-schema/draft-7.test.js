import path from 'path';
import buildTests from './build-tests';

describe('JSON Schema Draft 7', () => {
    const enabledTests = {
        // additionalItems: false,
        // additionalProperties: false,
        // boolean_schema: false,
        // const: true,
    };
    // const enabledTests = null;

    buildTests(path.join(__dirname, '/JSON-Schema-Test-Suite/tests/draft7'), enabledTests);
});
