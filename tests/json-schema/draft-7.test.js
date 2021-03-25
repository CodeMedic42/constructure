import path from 'path';
import buildTests from './build-tests';

describe('JSON Schema Draft 7', () => {
    const testContext = {
        enableType: 'whitelist',
        tests: {
            additionalItems: false,
            additionalProperties: 2,
            boolean_schema: false,
            const: false,
        },
    };

    buildTests(path.join(__dirname, '/JSON-Schema-Test-Suite/tests/draft7'), testContext);
});
