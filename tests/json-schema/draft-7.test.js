import path from 'path';
import buildTests from './build-tests';

describe('JSON Schema Draft 7', () => {
    const testContext = {
        enableType: 'whitelist',
        tests: {
            additionalItems: false,
            additionalProperties: false,
            boolean_schema: false,
            const: false,
            properties: true,
        },
    };

    buildTests(path.join(__dirname, '/JSON-Schema-Test-Suite/tests/draft7'), testContext);
});
