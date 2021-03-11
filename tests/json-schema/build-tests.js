import chai from 'chai';
import {
    isNil, reduce, forEach, isNumber,
} from 'lodash';
import fs from 'fs';
import path from 'path';
import Structure, { VerificationError } from '../../src';

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

export default function buildTests(testsPath, enabledTests) {
    const testFiles = loadTests(testsPath);
    let specificTest = null;
    let testCount = 0;

    forEach(testFiles, (testFile) => {
        if (!isNil(enabledTests)) {
            if (isNil(enabledTests[testFile.focus])) {
                return;
            }

            if (enabledTests[testFile.focus] === false) {
                return;
            }

            if (isNumber(enabledTests[testFile.focus])) {
                specificTest = enabledTests[testFile.focus];
            }
        }

        describe(testFile.focus, () => {
            forEach(testFile.data, (testData) => {
                describe(testData.description, () => {
                    forEach(testData.tests, (test) => {
                        if (isNil(specificTest) || testCount === specificTest) {
                            it(`${testCount} - ${test.description}`, () => {
                                const structure = Structure.fromSchema(testData.schema);

                                if (test.valid) {
                                    return structure.run(test.data).then((validationResult) => {
                                        expect(validationResult.getResult()).to.equal('pass');
                                    });
                                }

                                return structure.run(test.data).then((validationResult) => {
                                    expect(validationResult.getResult()).to.equal('fatal');
                                }).catch((error) => {
                                    expect(error).to.be.instanceOf(VerificationError);
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
