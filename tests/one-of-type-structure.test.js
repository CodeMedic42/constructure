import chai from 'chai';
import Structure from '../src';

const { expect } = chai;

describe('Shape Structure', () => {
    describe('Complex Structure', () => {
        const structure = Structure.shape({
            testString: Structure.string(),
            testOneOfType: Structure.oneOfType([
                Structure.string(),
                Structure.number(),
                Structure.shape({
                    testString: Structure.string(),
                    testNumber: Structure.number(),
                }),
            ]),
        });

        it('Property not defined', () => {
            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: 'pass',
                    $a: {},
                    testString: {
                        $r: 'pass',
                        $a: {},
                    },
                    testOneOfType: {
                        $r: 'pass',
                        $a: {},
                    },
                });
            });
        });

        it('Property null', () => {
            const value = {
                testString: 'test',
                testOneOfType: null,
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: 'pass',
                    $a: {},
                    testString: {
                        $r: 'pass',
                        $a: {},
                    },
                    testOneOfType: {
                        $r: 'pass',
                        $a: {},
                    },
                });
            });
        });

        it('Property string', () => {
            const value = {
                testString: 'test',
                testOneOfType: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: 'pass',
                    $a: {},
                    testString: {
                        $r: 'pass',
                        $a: {},
                    },
                    testOneOfType: {
                        $r: 'pass',
                        $a: {},
                    },
                });
            });
        });

        it('Property number', () => {
            const value = {
                testString: 'test',
                testOneOfType: 42,
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: 'pass',
                    $a: {},
                    testString: {
                        $r: 'pass',
                        $a: {},
                    },
                    testOneOfType: {
                        $r: 'pass',
                        $a: {},
                    },
                });
            });
        });

        it('Property object', () => {
            const value = {
                testString: 'test',
                testOneOfType: {},
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: 'pass',
                    $a: {},
                    testString: {
                        $r: 'pass',
                        $a: {},
                    },
                    testOneOfType: {
                        $r: 'pass',
                        $a: {},
                        testString: {
                            $r: 'pass',
                            $a: {},
                        },
                        testNumber: {
                            $r: 'pass',
                            $a: {},
                        },
                    },
                });
            });
        });
    });

    describe('Validation', () => {
        describe('using $parent', () => {
            const testReqAttAValue = 'A';
            const testReqAttBValue = 'B';
            const testReqAttCValue = 'C';

            const stringAttributeValue = 42;
            const numberAttributeValue = 43;
            const shapeAttributeValue = 44;

            const stringValue = '1';
            const numberValue = 2;
            const shapeValue = '3';

            const structure = Structure.shape({
                testReqValueA: Structure.string(),
                testReqValueB: Structure.string(),
                testReqValueC: Structure.string(),
                testOneOfType: Structure.oneOfType([
                    Structure.string()
                        .attributes({
                            flagged: Structure.attribute((value, requirements) => {
                                expect(value).to.eql(stringValue);
                                expect(requirements).to.eql([testReqAttAValue]);

                                return stringAttributeValue;
                            })
                                .setValidator((value, attributeValueResult, requirements) => {
                                    expect(value).to.eql(stringValue);
                                    expect(attributeValueResult).to.eql(stringAttributeValue);
                                    expect(requirements).to.eql([testReqAttAValue]);

                                    return 'Failing Message';
                                }, true)
                                .setRequirements(['$parent.testReqValueA']),
                        }),
                    Structure.number()
                        .attributes({
                            flagged: Structure.attribute((value, requirements) => {
                                expect(value).to.eql(numberValue);
                                expect(requirements).to.eql([testReqAttBValue]);

                                return numberAttributeValue;
                            })
                                .setValidator((value, attributeValueResult, requirements) => {
                                    expect(value).to.eql(numberValue);
                                    expect(attributeValueResult).to.eql(numberAttributeValue);
                                    expect(requirements).to.eql([testReqAttBValue]);

                                    return 'Failing Message';
                                }, true)
                                .setRequirements(['$parent.testReqValueB']),
                        }),
                    Structure.shape({
                        testString: Structure.string()
                            .attributes({
                                flagged: Structure.attribute((value, requirements) => {
                                    expect(value).to.eql(shapeValue);
                                    expect(requirements).to.eql([testReqAttCValue]);

                                    return shapeAttributeValue;
                                })
                                    .setValidator((value, attributeValueResult, requirements) => {
                                        expect(value).to.eql(shapeValue);
                                        expect(attributeValueResult).to.eql(shapeAttributeValue);
                                        expect(requirements).to.eql([testReqAttCValue]);

                                        return 'Failing Message';
                                    }, true)
                                    .setRequirements(['$parent.$parent.testReqValueC']),
                            }),
                    }),
                ]),
            });

            it('When string used', () => {
                const value = {
                    testReqValueA: testReqAttAValue,
                    testReqValueB: testReqAttBValue,
                    testReqValueC: testReqAttCValue,
                    testOneOfType: stringValue,
                };

                return structure.run(value).then((result) => {
                    expect(result).to.eql({
                        $r: 'fatal',
                        $a: {},
                        testReqValueA: {
                            $r: 'pass',
                            $a: {},
                        },
                        testReqValueB: {
                            $r: 'pass',
                            $a: {},
                        },
                        testReqValueC: {
                            $r: 'pass',
                            $a: {},
                        },
                        testOneOfType: {
                            $r: 'fatal',
                            $a: {
                                flagged: {
                                    value: stringAttributeValue,
                                    result: 'fatal',
                                    message: 'Failing Message',
                                },
                            },
                        },
                    });
                });
            });

            it('When string used', () => {
                const value = {
                    testReqValueA: testReqAttAValue,
                    testReqValueB: testReqAttBValue,
                    testReqValueC: testReqAttCValue,
                    testOneOfType: stringValue,
                };

                return structure.run(value).then((result) => {
                    expect(result).to.eql({
                        $r: 'fatal',
                        $a: {},
                        testReqValueA: {
                            $r: 'pass',
                            $a: {},
                        },
                        testReqValueB: {
                            $r: 'pass',
                            $a: {},
                        },
                        testReqValueC: {
                            $r: 'pass',
                            $a: {},
                        },
                        testOneOfType: {
                            $r: 'fatal',
                            $a: {
                                flagged: {
                                    value: stringAttributeValue,
                                    result: 'fatal',
                                    message: 'Failing Message',
                                },
                            },
                        },
                    });
                });
            });

            it('When number used', () => {
                const value = {
                    testReqValueA: testReqAttAValue,
                    testReqValueB: testReqAttBValue,
                    testReqValueC: testReqAttCValue,
                    testOneOfType: numberValue,
                };

                return structure.run(value).then((result) => {
                    expect(result).to.eql({
                        $r: 'fatal',
                        $a: {},
                        testReqValueA: {
                            $r: 'pass',
                            $a: {},
                        },
                        testReqValueB: {
                            $r: 'pass',
                            $a: {},
                        },
                        testReqValueC: {
                            $r: 'pass',
                            $a: {},
                        },
                        testOneOfType: {
                            $r: 'fatal',
                            $a: {
                                flagged: {
                                    value: numberAttributeValue,
                                    result: 'fatal',
                                    message: 'Failing Message',
                                },
                            },
                        },
                    });
                });
            });

            it('When shape used', () => {
                const value = {
                    testReqValueA: testReqAttAValue,
                    testReqValueB: testReqAttBValue,
                    testReqValueC: testReqAttCValue,
                    testOneOfType: {
                        testString: shapeValue,
                    },
                };

                return structure.run(value).then((result) => {
                    expect(result).to.eql({
                        $r: 'fatal',
                        $a: {},
                        testReqValueA: {
                            $r: 'pass',
                            $a: {},
                        },
                        testReqValueB: {
                            $r: 'pass',
                            $a: {},
                        },
                        testReqValueC: {
                            $r: 'pass',
                            $a: {},
                        },
                        testOneOfType: {
                            $r: 'fatal',
                            $a: {},
                            testString: {
                                $r: 'fatal',
                                $a: {
                                    flagged: {
                                        value: shapeAttributeValue,
                                        result: 'fatal',
                                        message: 'Failing Message',
                                    },
                                },
                            },
                        },
                    });
                });
            });
        });
    });
});
