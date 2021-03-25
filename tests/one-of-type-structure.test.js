import chai from 'chai';
import Structure from '../src';

const { expect } = chai;

xdescribe('Shape Structure', () => {
    xdescribe('Complex Structure', () => {
        const structure = Structure.object({
            testString: Structure.string(),
            testOneOfType: Structure.oneOfType([
                Structure.string(),
                Structure.number(),
                Structure.object({
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
                expect(result.toJS()).to.eql({
                    $r: 'pass',
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $d: {
                        testString: {
                            $r: 'pass',
                            $a: {},
                            $v: {
                                $m: null,
                                $r: 'pass',
                            },
                        },
                        testOneOfType: {
                            $r: 'pass',
                            $a: {},
                            $v: {
                                $m: null,
                                $r: 'pass',
                            },
                        },
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
                expect(result.toJS()).to.eql({
                    $r: 'fatal',
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $d: {
                        testString: {
                            $r: 'pass',
                            $a: {},
                            $v: {
                                $m: null,
                                $r: 'pass',
                            },
                        },
                        testOneOfType: {
                            $r: 'fatal',
                            $a: {},
                            $v: {
                                $m: 'Must match one of the given structures',
                                $r: 'fatal',
                            },
                        },
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
                expect(result.toJS()).to.eql({
                    $r: 'pass',
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $d: {
                        testString: {
                            $r: 'pass',
                            $a: {},
                            $v: {
                                $m: null,
                                $r: 'pass',
                            },
                        },
                        testOneOfType: {
                            $r: 'pass',
                            $a: {},
                            $v: {
                                $m: null,
                                $r: 'pass',
                            },
                        },
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
                expect(result.toJS()).to.eql({
                    $r: 'pass',
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $d: {
                        testString: {
                            $r: 'pass',
                            $a: {},
                            $v: {
                                $m: null,
                                $r: 'pass',
                            },
                        },
                        testOneOfType: {
                            $r: 'pass',
                            $a: {},
                            $v: {
                                $m: null,
                                $r: 'pass',
                            },
                        },
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
                expect(result.toJS()).to.eql({
                    $r: 'pass',
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $d: {
                        testString: {
                            $r: 'pass',
                            $a: {},
                            $v: {
                                $m: null,
                                $r: 'pass',
                            },
                        },
                        testOneOfType: {
                            $r: 'pass',
                            $a: {},
                            $v: {
                                $m: null,
                                $r: 'pass',
                            },
                            $d: {
                                testString: {
                                    $r: 'pass',
                                    $a: {},
                                    $v: {
                                        $m: null,
                                        $r: 'pass',
                                    },
                                },
                                testNumber: {
                                    $r: 'pass',
                                    $a: {},
                                    $v: {
                                        $m: null,
                                        $r: 'pass',
                                    },
                                },
                            },
                        },
                    },
                });
            });
        });
    });

    xdescribe('Validation', () => {
        xdescribe('using $parent', () => {
            const testReqAttAValue = 'A';
            const testReqAttBValue = 'B';
            const testReqAttCValue = 'C';
            const testReqAttDValue = 'D';

            const stringAspectValue = 42;
            const numberAspectValue = 43;
            const shapeAspectValue = 44;
            const commonAspectValue = 45;

            const stringValue = '1';
            const numberValue = 2;
            const shapeValue = '3';

            const buildStructure = (commonValue) => {
                return Structure.object({
                    testReqValueA: Structure.string(),
                    testReqValueB: Structure.string(),
                    testReqValueC: Structure.string(),
                    testReqValueD: Structure.string(),
                    testOneOfType: Structure.oneOfType([
                        Structure.string()
                            .aspect(
                                'flagged',
                                (value, requirements) => {
                                    expect(value).to.eql(stringValue);
                                    expect(requirements).to.eql([testReqAttAValue]);

                                    return stringAspectValue;
                                }, {
                                    validator: (value, aspectValueResult, requirements) => {
                                        expect(value).to.eql(stringValue);
                                        expect(aspectValueResult).to.eql(stringAspectValue);
                                        expect(requirements).to.eql([testReqAttAValue]);

                                        return 'Failing Message';
                                    },
                                    require: ['$parent.testReqValueA'],
                                },
                            ),
                        Structure.number()
                            .aspect('flagged', (value, requirements) => {
                                expect(value).to.eql(numberValue);
                                expect(requirements).to.eql([testReqAttBValue]);

                                return numberAspectValue;
                            }, {
                                validator: (value, aspectValueResult, requirements) => {
                                    expect(value).to.eql(numberValue);
                                    expect(aspectValueResult).to.eql(numberAspectValue);
                                    expect(requirements).to.eql([testReqAttBValue]);

                                    return 'Failing Message';
                                },
                                require: ['$parent.testReqValueB'],
                            }),
                        Structure.object({
                            testString: Structure.string()
                                .aspect('flagged', (value, requirements) => {
                                    expect(value).to.eql(shapeValue);
                                    expect(requirements).to.eql([testReqAttCValue]);

                                    return shapeAspectValue;
                                }, {
                                    validator: (
                                        value,
                                        aspectValueResult,
                                        requirements,
                                    ) => {
                                        expect(value).to.eql(shapeValue);
                                        expect(aspectValueResult)
                                            .to.eql(shapeAspectValue);
                                        expect(requirements).to.eql([testReqAttCValue]);

                                        return 'Failing Message';
                                    },
                                    require: ['$parent.$parent.testReqValueC'],
                                }),
                        }),
                    ])
                        .aspect('common', (value, requirements) => {
                            expect(value).to.eql(commonValue);
                            expect(requirements).to.eql([testReqAttDValue]);

                            return commonAspectValue;
                        }, {
                            validator: (value, aspectValueResult, requirements) => {
                                expect(value).to.eql(commonValue);
                                expect(aspectValueResult).to.eql(commonAspectValue);
                                expect(requirements).to.eql([testReqAttDValue]);

                                return 'Failing Message';
                            },
                            require: ['$parent.testReqValueD'],
                        }),
                });
            };

            it('When string used', () => {
                const value = {
                    testReqValueA: testReqAttAValue,
                    testReqValueB: testReqAttBValue,
                    testReqValueC: testReqAttCValue,
                    testReqValueD: testReqAttDValue,
                    testOneOfType: stringValue,
                };

                const structure = buildStructure(value.testOneOfType);

                return structure.run(value).then((result) => {
                    expect(result.toJS()).to.eql({
                        $r: 'fatal',
                        $a: {},
                        $v: {
                            $m: null,
                            $r: 'pass',
                        },
                        $d: {
                            testReqValueA: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $m: null,
                                    $r: 'pass',
                                },
                            },
                            testReqValueB: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $m: null,
                                    $r: 'pass',
                                },
                            },
                            testReqValueC: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $m: null,
                                    $r: 'pass',
                                },
                            },
                            testReqValueD: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $m: null,
                                    $r: 'pass',
                                },
                            },
                            testOneOfType: {
                                $r: 'fatal',
                                $a: {
                                    flagged: {
                                        value: stringAspectValue,
                                        result: 'fatal',
                                        message: 'Failing Message',
                                    },
                                    common: {
                                        value: commonAspectValue,
                                        result: 'fatal',
                                        message: 'Failing Message',
                                    },
                                },
                                $v: {
                                    $m: null,
                                    $r: 'pass',
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
                    testReqValueD: testReqAttDValue,
                    testOneOfType: numberValue,
                };

                const structure = buildStructure(value.testOneOfType);

                return structure.run(value).then((result) => {
                    expect(result.toJS()).to.eql({
                        $r: 'fatal',
                        $a: {},
                        $v: {
                            $m: null,
                            $r: 'pass',
                        },
                        $d: {
                            testReqValueA: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $m: null,
                                    $r: 'pass',
                                },
                            },
                            testReqValueB: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $m: null,
                                    $r: 'pass',
                                },
                            },
                            testReqValueC: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $m: null,
                                    $r: 'pass',
                                },
                            },
                            testReqValueD: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $m: null,
                                    $r: 'pass',
                                },
                            },
                            testOneOfType: {
                                $r: 'fatal',
                                $a: {
                                    flagged: {
                                        value: numberAspectValue,
                                        result: 'fatal',
                                        message: 'Failing Message',
                                    },
                                    common: {
                                        value: commonAspectValue,
                                        result: 'fatal',
                                        message: 'Failing Message',
                                    },
                                },
                                $v: {
                                    $m: null,
                                    $r: 'pass',
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
                    testReqValueD: testReqAttDValue,
                    testOneOfType: {
                        testString: shapeValue,
                    },
                };

                const structure = buildStructure(value.testOneOfType);

                return structure.run(value).then((result) => {
                    expect(result.toJS()).to.eql({
                        $r: 'fatal',
                        $a: {},
                        $v: {
                            $m: null,
                            $r: 'pass',
                        },
                        $d: {
                            testReqValueA: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $m: null,
                                    $r: 'pass',
                                },
                            },
                            testReqValueB: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $m: null,
                                    $r: 'pass',
                                },
                            },
                            testReqValueC: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $m: null,
                                    $r: 'pass',
                                },
                            },
                            testReqValueD: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $m: null,
                                    $r: 'pass',
                                },
                            },
                            testOneOfType: {
                                $r: 'fatal',
                                $a: {
                                    common: {
                                        value: commonAspectValue,
                                        result: 'fatal',
                                        message: 'Failing Message',
                                    },
                                },
                                $v: {
                                    $m: null,
                                    $r: 'pass',
                                },
                                $d: {
                                    testString: {
                                        $r: 'fatal',
                                        $a: {
                                            flagged: {
                                                value: shapeAspectValue,
                                                result: 'fatal',
                                                message: 'Failing Message',
                                            },
                                        },
                                        $v: {
                                            $m: null,
                                            $r: 'pass',
                                        },
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
