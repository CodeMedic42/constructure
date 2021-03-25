import chai from 'chai';
import {
    isNil, reduce, forEach, isNumber,
} from 'lodash';
import fs from 'fs';
import path from 'path';
import Structure from '../../src';

const { expect } = chai;

function loadTests(testsPath) {
    const dirents = fs.readdirSync(testsPath, { withFileTypes: true });

    return reduce(dirents, (acc, dirent) => {
        if (dirent.isFile()) {
            const filePath = path.join(testsPath, dirent.name);

            const fileData = fs.readFileSync(filePath, 'utf8');

            acc.push({
                focus: path.basename(filePath, '.json'),
                data: JSON.parse(fileData),
            });
        }

        return acc;
    }, []);
}

function getTestEnabled(testContext, testId) {
    const { enableType, tests } = testContext;

    if (enableType === 'whitelist') {
        if (tests[testId] === true) {
            return true;
        }

        if (isNumber(tests[testId])) {
            return tests[testId];
        }

        return false;
    }

    if (enableType === 'blacklist') {
        if (tests[testId] === false) {
            return false;
        }

        if (isNumber(tests[testId])) {
            return tests[testId];
        }

        return true;
    }

    return true;
}

export default function buildTests(testsPath, testContext) {
    const testFiles = loadTests(testsPath);

    forEach(testFiles, (testFile) => {
        let specificTest = null;

        const enabled = getTestEnabled(testContext, testFile.focus);

        if (isNumber(enabled)) {
            specificTest = enabled;
        } else if (!enabled) {
            return;
        }

        describe(testFile.focus, () => {
            let testCount = 0;

            forEach(testFile.data, (testData) => {
                describe(testData.description, () => {
                    forEach(testData.tests, (test) => {
                        if (isNil(specificTest) || testCount === specificTest) {
                            it(`${testCount} - ${test.description}`, () => {
                                const structure = Structure.fromSchema(testData.schema);

                                return structure.run(test.data).then((validationResult) => {
                                    expect(validationResult.getResult()).to.equal(test.valid ? 'pass' : 'fatal');
                                });
                            });
                        }

                        testCount += 1;
                    });
                });
            });
        });
    });
}
