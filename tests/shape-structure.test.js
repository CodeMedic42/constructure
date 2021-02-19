import chai from 'chai';
import Promise from 'bluebird';
import Structure from '../src';
import Validator from '../src/validators/validator';

const { expect } = chai;

// const fatal = true;
// const nonFatal = false;
const attributeValue = 42;

function buildFlaggedResult(value, result, message) {
    return { value, result, message };
}

function buildValidatorMessage(value, attributeValue) {
    return `value:${value} attributeValue:${attributeValue}`;
}

const validator = ({ value, attributeValue }) => buildValidatorMessage(value, attributeValue);

// function buildValidator(isFatal) {
//     return new Validator(({ value, attributeValue }) => buildValidatorMessage(value, attributeValue), isFatal);
// }

describe('Shape Structure', () => {
    describe('Simple Property', () => {
        it('Basic Property Attribute', () => {
            const structure = Structure.shape({
                testString: Structure.string(),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: null,
                    $a: {},
                    testString: {
                        $r: null,
                        $a: {},
                    },
                });
            });
        });

        it('Static Property Attribute', () => {
            const structure = Structure.shape({
                testString: Structure.string()
                    .attributes({
                        flagged: Structure.attribute(attributeValue),
                    }),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: null,
                    $a: {},
                    testString: {
                        $r: null,
                        $a: {
                            flagged: buildFlaggedResult(attributeValue, null, null),
                        },
                    },
                });
            });
        });

        it('Null Static Property Attribute', () => {
            const structure = Structure.shape({
                testString: Structure.string()
                    .attributes({
                        flagged: Structure.attribute(null),
                    }),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: null,
                    $a: {},
                    testString: {
                        $r: null,
                        $a: {
                            flagged: buildFlaggedResult(null, null, null),
                        },
                    },
                });
            });
        });

        it('Undefined Static Property Attribute', () => {
            const structure = Structure.shape({
                testString: Structure.string()
                    .attributes({
                        flagged: Structure.attribute(),
                    }),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: null,
                    $a: {},
                    testString: {
                        $r: null,
                        $a: {
                            flagged: buildFlaggedResult(null, null, null),
                        },
                    },
                });
            });
        });

        it('Dynamic Property Attribute', () => {
            const structure = Structure.shape({
                testString: Structure.string()
                    .attributes({
                        flagged: Structure.attribute(() => attributeValue),
                    }),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: null,
                    $a: {},
                    testString: {
                        $r: null,
                        $a: {
                            flagged: buildFlaggedResult(attributeValue, null, null),
                        },
                    },
                });
            });
        });

        it('Null Dynamic Property Attribute', () => {
            const structure = Structure.shape({
                testString: Structure.string()
                    .attributes({
                        flagged: Structure.attribute(() => null),
                    }),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: null,
                    $a: {},
                    testString: {
                        $r: null,
                        $a: {
                            flagged: buildFlaggedResult(null, null, null),
                        },
                    },
                });
            });
        });

        it('Undefined Dynamic Property Attribute', () => {
            const structure = Structure.shape({
                testString: Structure.string()
                    .attributes({
                        flagged: Structure.attribute(() => undefined),
                    }),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: null,
                    $a: {},
                    testString: {
                        $r: null,
                        $a: {
                            flagged: buildFlaggedResult(null, null, null),
                        },
                    },
                });
            });
        });

        it('Async Property Attribute', () => {
            const structure = Structure.shape({
                testString: Structure.string()
                    .attributes({
                        flagged: Structure.attribute(Promise.delay(500).then(() => attributeValue)),
                    }),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: null,
                    $a: {},
                    testString: {
                        $r: null,
                        $a: {
                            flagged: buildFlaggedResult(attributeValue, null, null),
                        },
                    },
                });
            });
        });

        it('Null Async Property Attribute', () => {
            const structure = Structure.shape({
                testString: Structure.string()
                    .attributes({
                        flagged: Structure.attribute(Promise.delay(500).then(() => null)),
                    }),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: null,
                    $a: {},
                    testString: {
                        $r: null,
                        $a: {
                            flagged: buildFlaggedResult(null, null, null),
                        },
                    },
                });
            });
        });

        it('Undefined Async Property Attribute', () => {
            const structure = Structure.shape({
                testString: Structure.string()
                    .attributes({
                        flagged: Structure.attribute(Promise.delay(500).then(() => undefined)),
                    }),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: null,
                    $a: {},
                    testString: {
                        $r: null,
                        $a: {
                            flagged: buildFlaggedResult(null, null, null),
                        },
                    },
                });
            });
        });
    });

    describe('Simple Property Validation', () => {
        const runValidationTests = (isFatal) => {
            const fatalType = isFatal ? 'fatal' : 'non-fatal';

            describe(`Result is ${fatalType}`, () => {
                it('Null Static Property Attribute', () => {
                    const structure = Structure.shape({
                        testString: Structure.string()
                            .attributes({
                                flagged: Structure
                                    .attribute(null)
                                    .setValidator(validator, isFatal),
                            }),
                    });

                    const value = {
                        testString: 'test',
                    };

                    return structure.run(value).then((result) => {
                        expect(result).to.eql({
                            $r: null,
                            $a: {},
                            testString: {
                                $r: null,
                                $a: {
                                    flagged: buildFlaggedResult(null, null, null),
                                },
                            },
                        });
                    });
                });

                it('Undefined Static Property Attribute', () => {
                    const structure = Structure.shape({
                        testString: Structure.string()
                            .attributes({
                                flagged: Structure
                                    .attribute(undefined)
                                    .setValidator(validator, isFatal),
                            }),
                    });

                    const value = {
                        testString: 'test',
                    };

                    return structure.run(value).then((result) => {
                        expect(result).to.eql({
                            $r: null,
                            $a: {},
                            testString: {
                                $r: null,
                                $a: {
                                    flagged: buildFlaggedResult(null, null, null),
                                },
                            },
                        });
                    });
                });

                it('Static Property Attribute', () => {
                    const structure = Structure.shape({
                        testString: Structure.string()
                            .attributes({
                                flagged: Structure
                                    .attribute(attributeValue)
                                    .setValidator(validator, isFatal),
                            }),
                    });

                    const value = {
                        testString: 'test',
                    };

                    return structure.run(value).then((result) => {
                        expect(result).to.eql({
                            $r: fatalType,
                            $a: {},
                            testString: {
                                $r: fatalType,
                                $a: {
                                    flagged: buildFlaggedResult(attributeValue, fatalType, buildValidatorMessage(value.testString, attributeValue)),
                                },
                            },
                        });
                    });
                });

                it('Null Dynamic Property Attribute', () => {
                    const structure = Structure.shape({
                        testString: Structure.string()
                            .attributes({
                                flagged: Structure
                                    .attribute(() => null)
                                    .setValidator(validator, isFatal),
                            }),
                    });

                    const value = {
                        testString: 'test',
                    };

                    return structure.run(value).then((result) => {
                        expect(result).to.eql({
                            $r: null,
                            $a: {},
                            testString: {
                                $r: null,
                                $a: {
                                    flagged: buildFlaggedResult(null, null, null),
                                },
                            },
                        });
                    });
                });

                it('Undefined Dynamic Property Attribute', () => {
                    const structure = Structure.shape({
                        testString: Structure.string()
                            .attributes({
                                flagged: Structure
                                    .attribute(() => undefined)
                                    .setValidator(validator, isFatal),
                            }),
                    });

                    const value = {
                        testString: 'test',
                    };

                    return structure.run(value).then((result) => {
                        expect(result).to.eql({
                            $r: null,
                            $a: {},
                            testString: {
                                $r: null,
                                $a: {
                                    flagged: buildFlaggedResult(null, null, null),
                                },
                            },
                        });
                    });
                });

                it('Dynamic Property Attribute', () => {
                    const structure = Structure.shape({
                        testString: Structure.string()
                            .attributes({
                                flagged: Structure
                                    .attribute(() => attributeValue)
                                    .setValidator(validator, isFatal),
                            }),
                    });

                    const value = {
                        testString: 'test',
                    };

                    return structure.run(value).then((result) => {
                        expect(result).to.eql({
                            $r: fatalType,
                            $a: {},
                            testString: {
                                $r: fatalType,
                                $a: {
                                    flagged: buildFlaggedResult(attributeValue, fatalType, buildValidatorMessage(value.testString, attributeValue)),
                                },
                            },
                        });
                    });
                });
            });
        }

        runValidationTests(true);
        runValidationTests(false);
    });

    // xdescribe('With Requirements', () => {
    //     it('Static Property Attribute', () => {
    //         const structure = Structure.shape({
    //             testString: Structure.string()
    //                 .attributes({
    //                     flagged: Structure.attribute(attributeValue)
    //                         .setRequirements()
    //                         .setValidator(),
    //                 })
    //             }),
    //         });

    //         const value = {
    //             testString: 'test',
    //         };

    //         return structure.run(value).then((result) => {
    //             expect(result).to.eql({
    //                 $r: null,
    //                 $a: {},
    //                 testString: {
    //                     $r: null,
    //                     $a: {
    //                         flagged: buildFlaggedResult(attributeValue, null, null),
    //                     },
    //                 },
    //             });
    //         });
    //     });
    // });
});
