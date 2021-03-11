import path from 'path';
import buildTests from './build-tests';

describe('JSON Schema Draft 7', () => {
    const enabledTests = {
        additionalItems: true,
    };

    buildTests(path.join(__dirname, '/JSON-Schema-Test-Suite/tests/draft7'), enabledTests);
});
