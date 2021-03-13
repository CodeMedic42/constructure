import chai from 'chai';
import Promise from 'bluebird';
import Structure, { Aspect } from '../src';

const { expect } = chai;

const aspectValue = 42;

function buildFlaggedResult(value, result, message) {
    return { value, result, message };
}

function buildValidatorMessage(value, aspectResultValue) {
    return `value:${value} aspectValue:${aspectResultValue}`;
}

const onValidate = (value, aspectResultValue) => buildValidatorMessage(
    value,
    aspectResultValue,
);

describe('object Structure', () => {
    describe('Simple Structure', () => {
        it('Basic Property Fail Verify', () => {
            const structure = Structure.object({
                testString: Structure.string(),
            });

            const value = {
                testString: 42,
            };

            return structure.run(value).then((aspectValues) => {
                expect(aspectValues.toJS()).to.eql({
                    $r: 'fatal',
                    $a: {},
                    $v: {
                        $r: 'pass',
                        $m: null,
                    },
                    $d: {
                        testString: {
                            $r: 'fatal',
                            $a: {},
                            $v: {
                                $r: 'fatal',
                                $m: 'Must be a string',
                            },
                        },
                    },
                });
            });
        });

        it('Basic Property Aspect', () => {
            const structure = Structure.object({
                testString: Structure.string(),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result.toJS()).to.eql({
                    $r: 'pass',
                    $a: {},
                    $v: {
                        $r: 'pass',
                        $m: null,
                    },
                    $d: {
                        testString: {
                            $r: 'pass',
                            $a: {},
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                        },
                    },
                });
            });
        });

        it('Static Property Aspect', () => {
            const structure = Structure.object({
                testString: Structure.string()
                    .aspect('flagged', aspectValue),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                const ret = result.toJS();

                expect(ret).to.eql({
                    $r: 'pass',
                    $a: {},
                    $v: {
                        $r: 'pass',
                        $m: null,
                    },
                    $d: {
                        testString: {
                            $r: 'pass',
                            $a: {
                                flagged: buildFlaggedResult(aspectValue, 'pass', null),
                            },
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                        },
                    },
                });
            });
        });

        it('Null Static Property Aspect', () => {
            const structure = Structure.object({
                testString: Structure.string()
                    .aspect('flagged', null),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result.toJS()).to.eql({
                    $r: 'pass',
                    $a: {},
                    $v: {
                        $r: 'pass',
                        $m: null,
                    },
                    $d: {
                        testString: {
                            $r: 'pass',
                            $a: {
                                flagged: buildFlaggedResult(null, 'pass', null),
                            },
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                        },
                    },
                });
            });
        });

        it('Undefined Static Property Aspect', () => {
            const structure = Structure.object({
                testString: Structure.string()
                    .aspect('flagged', undefined),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result.toJS()).to.eql({
                    $r: 'pass',
                    $a: {},
                    $v: {
                        $r: 'pass',
                        $m: null,
                    },
                    $d: {
                        testString: {
                            $r: 'pass',
                            $a: {
                                flagged: buildFlaggedResult(undefined, 'pass', null),
                            },
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                        },
                    },
                });
            });
        });

        it('Dynamic Property Aspect', () => {
            const structure = Structure.object({
                testString: Structure.string()
                    .aspect('flagged', () => aspectValue),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result.toJS()).to.eql({
                    $r: 'pass',
                    $a: {},
                    $v: {
                        $r: 'pass',
                        $m: null,
                    },
                    $d: {
                        testString: {
                            $r: 'pass',
                            $a: {
                                flagged: buildFlaggedResult(aspectValue, 'pass', null),
                            },
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                        },
                    },
                });
            });
        });

        it('Null Dynamic Property Aspect', () => {
            const structure = Structure.object({
                testString: Structure.string()
                    .aspect('flagged', () => null),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result.toJS()).to.eql({
                    $r: 'pass',
                    $a: {},
                    $v: {
                        $r: 'pass',
                        $m: null,
                    },
                    $d: {
                        testString: {
                            $r: 'pass',
                            $a: {
                                flagged: buildFlaggedResult(null, 'pass', null),
                            },
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                        },
                    },
                });
            });
        });

        it('Undefined Dynamic Property Aspect', () => {
            const structure = Structure.object({
                testString: Structure.string()
                    .aspect('flagged', () => undefined),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result.toJS()).to.eql({
                    $r: 'pass',
                    $a: {},
                    $v: {
                        $r: 'pass',
                        $m: null,
                    },
                    $d: {
                        testString: {
                            $r: 'pass',
                            $a: {
                                flagged: buildFlaggedResult(undefined, 'pass', null),
                            },
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                        },
                    },
                });
            });
        });

        it('Async Property Aspect', () => {
            const structure = Structure.object({
                testString: Structure.string()
                    .aspect('flagged', () => Promise.delay(500).then(() => aspectValue)),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result.toJS()).to.eql({
                    $r: 'pass',
                    $a: {},
                    $v: {
                        $r: 'pass',
                        $m: null,
                    },
                    $d: {
                        testString: {
                            $r: 'pass',
                            $a: {
                                flagged: buildFlaggedResult(aspectValue, 'pass', null),
                            },
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                        },
                    },
                });
            });
        });

        it('Null Async Property Aspect', () => {
            const structure = Structure.object({
                testString: Structure.string()
                    .aspect('flagged', () => Promise.delay(500).then(() => null)),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result.toJS()).to.eql({
                    $r: 'pass',
                    $a: {},
                    $v: {
                        $r: 'pass',
                        $m: null,
                    },
                    $d: {
                        testString: {
                            $r: 'pass',
                            $a: {
                                flagged: buildFlaggedResult(null, 'pass', null),
                            },
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                        },
                    },
                });
            });
        });

        it('Undefined Async Property Aspect', () => {
            const structure = Structure.object({
                testString: Structure.string()
                    .aspect('flagged', () => Promise.delay(500).then(() => undefined)),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result.toJS()).to.eql({
                    $r: 'pass',
                    $a: {},
                    $v: {
                        $r: 'pass',
                        $m: null,
                    },
                    $d: {
                        testString: {
                            $r: 'pass',
                            $a: {
                                flagged: buildFlaggedResult(undefined, 'pass', null),
                            },
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                        },
                    },
                });
            });
        });

        describe('Validation', () => {
            const runValidationTests = (isFatal) => {
                const fatalType = isFatal ? 'fatal' : 'non-fatal';

                describe(`Result is ${fatalType}`, () => {
                    it('Null Static Property Aspect', () => {
                        const structure = Structure.object({
                            testString: Structure.string()
                                .aspect('flagged', null, {
                                    validator: { onValidate, isFatal },
                                }),
                        });

                        const value = {
                            testString: 'test',
                        };

                        return structure.run(value).then((result) => {
                            expect(result.toJS()).to.eql({
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                                $d: {
                                    testString: {
                                        $r: 'pass',
                                        $a: {
                                            flagged: buildFlaggedResult(null, 'pass', null),
                                        },
                                        $v: {
                                            $r: 'pass',
                                            $m: null,
                                        },
                                    },
                                },
                            });
                        });
                    });

                    it('Undefined Static Property Aspect', () => {
                        const structure = Structure.object({
                            testString: Structure.string()
                                .aspect('flagged', undefined, {
                                    validator: { onValidate, isFatal },
                                }),
                        });

                        const value = {
                            testString: 'test',
                        };

                        return structure.run(value).then((result) => {
                            expect(result.toJS()).to.eql({
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                                $d: {
                                    testString: {
                                        $r: 'pass',
                                        $a: {
                                            flagged: buildFlaggedResult(undefined, 'pass', null),
                                        },
                                        $v: {
                                            $r: 'pass',
                                            $m: null,
                                        },
                                    },
                                },
                            });
                        });
                    });

                    it('Static Property Aspect', () => {
                        const structure = Structure.object({
                            testString: Structure.string()
                                .aspect('flagged', aspectValue, {
                                    validator: { onValidate, isFatal },
                                }),
                        });

                        const value = {
                            testString: 'test',
                        };

                        return structure.run(value).then((result) => {
                            expect(result.toJS()).to.eql({
                                $r: fatalType,
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                                $d: {
                                    testString: {
                                        $r: fatalType,
                                        $a: {
                                            flagged: buildFlaggedResult(
                                                aspectValue,
                                                fatalType,
                                                buildValidatorMessage(
                                                    value.testString,
                                                    aspectValue,
                                                ),
                                            ),
                                        },
                                        $v: {
                                            $r: 'pass',
                                            $m: null,
                                        },
                                    },
                                },
                            });
                        });
                    });

                    it('Null Dynamic Property Aspect', () => {
                        const structure = Structure.object({
                            testString: Structure.string()
                                .aspect('flagged', () => null, {
                                    validator: { onValidate, isFatal },
                                }),
                        });

                        const value = {
                            testString: 'test',
                        };

                        return structure.run(value).then((result) => {
                            expect(result.toJS()).to.eql({
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                                $d: {
                                    testString: {
                                        $r: 'pass',
                                        $a: {
                                            flagged: buildFlaggedResult(null, 'pass', null),
                                        },
                                        $v: {
                                            $r: 'pass',
                                            $m: null,
                                        },
                                    },
                                },
                            });
                        });
                    });

                    it('Undefined Dynamic Property Aspect', () => {
                        const structure = Structure.object({
                            testString: Structure.string()
                                .aspect('flagged', () => undefined, {
                                    validator: { onValidate, isFatal },
                                }),
                        });

                        const value = {
                            testString: 'test',
                        };

                        return structure.run(value).then((result) => {
                            expect(result.toJS()).to.eql({
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                                $d: {
                                    testString: {
                                        $r: 'pass',
                                        $a: {
                                            flagged: buildFlaggedResult(undefined, 'pass', null),
                                        },
                                        $v: {
                                            $r: 'pass',
                                            $m: null,
                                        },
                                    },
                                },
                            });
                        });
                    });

                    it('Dynamic Property Aspect', () => {
                        const structure = Structure.object({
                            testString: Structure.string()
                                .aspect('flagged', () => aspectValue, {
                                    validator: { onValidate, isFatal },
                                }),
                        });

                        const value = {
                            testString: 'test',
                        };

                        return structure.run(value).then((result) => {
                            expect(result.toJS()).to.eql({
                                $r: fatalType,
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                                $d: {
                                    testString: {
                                        $r: fatalType,
                                        $a: {
                                            flagged: buildFlaggedResult(
                                                aspectValue,
                                                fatalType,
                                                buildValidatorMessage(
                                                    value.testString,
                                                    aspectValue,
                                                ),
                                            ),
                                        },
                                        $v: {
                                            $r: 'pass',
                                            $m: null,
                                        },
                                    },
                                },
                            });
                        });
                    });
                });
            };

            runValidationTests(true);
            runValidationTests(false);
        });

        describe('With Requirements', () => {
            describe('Internal Requirements', () => {
                it('Static Property Aspect flagged => requiredAttA', () => {
                    const structure = Structure.object({
                        testString: Structure.string()
                            .aspect(
                                'flagged',
                                (value, requirements) => {
                                    expect(value).to.equal('test');
                                    expect(requirements).to.eql([42]);

                                    return aspectValue;
                                }, {
                                    require: [':requiredAttA'],
                                },
                            )
                            .aspect('requiredAttA', 42),
                    });

                    const value = {
                        testString: 'test',
                    };

                    return structure.run(value).then((result) => {
                        expect(result.toJS()).to.eql({
                            $r: 'pass',
                            $a: {},
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                            $d: {
                                testString: {
                                    $r: 'pass',
                                    $a: {
                                        flagged: buildFlaggedResult(aspectValue, 'pass', null),
                                        requiredAttA: buildFlaggedResult(42, 'pass', null),
                                    },
                                    $v: {
                                        $r: 'pass',
                                        $m: null,
                                    },
                                },
                            },
                        });
                    });
                });

                it('Static Property Aspect flagged => requiredAttA => requiredAttB', () => {
                    const structure = Structure.object({
                        testString: Structure.string()
                            .aspect(
                                'flagged',
                                (value, requirements) => {
                                    expect(value).to.equal('test');
                                    expect(requirements).to.eql([42, 'foo']);

                                    return aspectValue;
                                }, {
                                    require: [':requiredAttA', ':requiredAttB'],
                                },
                            )
                            .aspect('requiredAttA', 42, {
                                require: [':requiredAttB'],
                            })
                            .aspect('requiredAttB', 'foo'),
                    });

                    const value = {
                        testString: 'test',
                    };

                    return structure.run(value).then((result) => {
                        expect(result.toJS()).to.eql({
                            $r: 'pass',
                            $a: {},
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                            $d: {
                                testString: {
                                    $r: 'pass',
                                    $a: {
                                        flagged: buildFlaggedResult(aspectValue, 'pass', null),
                                        requiredAttA: buildFlaggedResult(42, 'pass', null),
                                        requiredAttB: buildFlaggedResult('foo', 'pass', null),
                                    },
                                    $v: {
                                        $r: 'pass',
                                        $m: null,
                                    },
                                },
                            },
                        });
                    });
                });
            });

            describe('Child Requirements', () => {
                it('Static Property Aspect flagged => requiredAttA', () => {
                    const structure = Structure.object({
                        testString: Structure.string()
                            .aspect('requiredAttA', 42),
                    })
                        .aspect('flagged', (value, requirements) => {
                            expect(value).to.eql({
                                testString: 'test',
                            });
                            expect(requirements).to.eql([42]);

                            return aspectValue;
                        }, {
                            require: ['testString:requiredAttA'],
                        });

                    const value = {
                        testString: 'test',
                    };

                    return structure.run(value).then((result) => {
                        expect(result.toJS()).to.eql({
                            $r: 'pass',
                            $a: {
                                flagged: buildFlaggedResult(aspectValue, 'pass', null),
                            },
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                            $d: {
                                testString: {
                                    $r: 'pass',
                                    $a: {
                                        requiredAttA: buildFlaggedResult(42, 'pass', null),
                                    },
                                    $v: {
                                        $r: 'pass',
                                        $m: null,
                                    },
                                },
                            },
                        });
                    });
                });

                it('Static Property Aspect flagged => requiredAttA => requiredAttB', () => {
                    const structure = Structure.object({
                        testString: Structure.string()
                            .aspect('requiredAttA', 42, {
                                require: ['$parent.testNumber:requiredAttB'],
                            }),
                        testNumber: Structure.number()
                            .aspect('requiredAttB', 'foo'),
                    })
                        .aspect('flagged', (value, requirements) => {
                            expect(value).to.eql({
                                testString: 'test',
                                testNumber: 237,
                            });
                            expect(requirements).to.eql([42, 'foo']);

                            return aspectValue;
                        }, {
                            require: ['testString:requiredAttA', 'testNumber:requiredAttB'],
                        });

                    const value = {
                        testString: 'test',
                        testNumber: 237,
                    };

                    return structure.run(value).then((result) => {
                        expect(result.toJS()).to.eql({
                            $r: 'pass',
                            $a: {
                                flagged: buildFlaggedResult(aspectValue, 'pass', null),
                            },
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                            $d: {
                                testString: {
                                    $r: 'pass',
                                    $a: {
                                        requiredAttA: buildFlaggedResult(42, 'pass', null),
                                    },
                                    $v: {
                                        $r: 'pass',
                                        $m: null,
                                    },
                                },
                                testNumber: {
                                    $r: 'pass',
                                    $a: {
                                        requiredAttB: buildFlaggedResult('foo', 'pass', null),
                                    },
                                    $v: {
                                        $r: 'pass',
                                        $m: null,
                                    },
                                },
                            },
                        });
                    });
                });
            });
        });
    });

    describe('Deep Structure', () => {
        it('Null object', () => {
            const structure = Structure.object({
                testString: Structure.string(),
                testNumber: Structure.number(),
                testobject: Structure.object({
                    testString: Structure.string(),
                    testNumber: Structure.number(),
                    testobject: Structure.object({
                        testString: Structure.string(),
                        testNumber: Structure.number(),
                    }),
                }),
            });

            const value = {
                testString: 'test',
                testNumber: 42,
            };

            return structure.run(value).then((result) => {
                expect(result.toJS()).to.eql({
                    $r: 'pass',
                    $a: {},
                    $v: {
                        $r: 'pass',
                        $m: null,
                    },
                    $d: {
                        testString: {
                            $r: 'pass',
                            $a: {},
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                        },
                        testNumber: {
                            $r: 'pass',
                            $a: {},
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                        },
                        testobject: {
                            $r: 'pass',
                            $a: {},
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                            $d: {
                                testString: {
                                    $r: 'pass',
                                    $a: {},
                                    $v: {
                                        $r: 'pass',
                                        $m: null,
                                    },
                                },
                                testNumber: {
                                    $r: 'pass',
                                    $a: {},
                                    $v: {
                                        $r: 'pass',
                                        $m: null,
                                    },
                                },
                                testobject: {
                                    $r: 'pass',
                                    $a: {},
                                    $v: {
                                        $r: 'pass',
                                        $m: null,
                                    },
                                    $d: {
                                        testString: {
                                            $r: 'pass',
                                            $a: {},
                                            $v: {
                                                $r: 'pass',
                                                $m: null,
                                            },
                                        },
                                        testNumber: {
                                            $r: 'pass',
                                            $a: {},
                                            $v: {
                                                $r: 'pass',
                                                $m: null,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                });
            });
        });

        it('Full object', () => {
            const structure = Structure.object({
                testString: Structure.string(),
                testNumber: Structure.number(),
                testobject: Structure.object({
                    testString: Structure.string(),
                    testNumber: Structure.number(),
                    testobject: Structure.object({
                        testString: Structure.string(),
                        testNumber: Structure.number(),
                    }),
                }),
            });

            const value = {
                testString: 'test',
                testNumber: 42,
                testobject: {
                    testString: 'test',
                    testNumber: 42,
                    testobject: {
                        testString: 'test',
                        testNumber: 42,
                    },
                },
            };

            return structure.run(value).then((result) => {
                expect(result.toJS()).to.eql({
                    $r: 'pass',
                    $a: {},
                    $v: {
                        $r: 'pass',
                        $m: null,
                    },
                    $d: {
                        testString: {
                            $r: 'pass',
                            $a: {},
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                        },
                        testNumber: {
                            $r: 'pass',
                            $a: {},
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                        },
                        testobject: {
                            $r: 'pass',
                            $a: {},
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                            $d: {
                                testString: {
                                    $r: 'pass',
                                    $a: {},
                                    $v: {
                                        $r: 'pass',
                                        $m: null,
                                    },
                                },
                                testNumber: {
                                    $r: 'pass',
                                    $a: {},
                                    $v: {
                                        $r: 'pass',
                                        $m: null,
                                    },
                                },
                                testobject: {
                                    $r: 'pass',
                                    $a: {},
                                    $v: {
                                        $r: 'pass',
                                        $m: null,
                                    },
                                    $d: {
                                        testString: {
                                            $r: 'pass',
                                            $a: {},
                                            $v: {
                                                $r: 'pass',
                                                $m: null,
                                            },
                                        },
                                        testNumber: {
                                            $r: 'pass',
                                            $a: {},
                                            $v: {
                                                $r: 'pass',
                                                $m: null,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                });
            });
        });

        it('Deep Failing Validation with Requirements', () => {
            const structure = Structure.object({
                testStringA: Structure.string()
                    .aspect('requiredAttA', 'foo'),
                testNumber: Structure.number(),
                testobjectA: Structure.object({
                    testString: Structure.string(),
                    testNumber: Structure.number(),
                    testobjectB: Structure.object({
                        testStringB: Structure.string()
                            .aspect('flagged', (value, requirements) => {
                                expect(value).to.eql('test');
                                expect(requirements).to.eql(['foo']);

                                return aspectValue;
                            }, {
                                validator: (value, aspectValueResult, requirements) => {
                                    expect(value).to.eql('test');
                                    expect(aspectValueResult).to.eql(aspectValue);
                                    expect(requirements).to.eql(['foo']);

                                    return 'Failing Message';
                                },
                                require: ['$root.testStringA:requiredAttA'],
                            }),
                        testNumber: Structure.number(),
                    }),
                }),
            });

            const value = {
                testStringA: 'test',
                testNumber: 42,
                testobjectA: {
                    testString: 'test',
                    testNumber: 42,
                    testobjectB: {
                        testStringB: 'test',
                        testNumber: 42,
                    },
                },
            };

            return structure.run(value).then((result) => {
                expect(result.toJS()).to.eql({
                    $r: 'fatal',
                    $a: {},
                    $v: {
                        $r: 'pass',
                        $m: null,
                    },
                    $d: {
                        testStringA: {
                            $r: 'pass',
                            $a: {
                                requiredAttA: {
                                    value: 'foo',
                                    result: 'pass',
                                    message: null,
                                },
                            },
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                        },
                        testNumber: {
                            $r: 'pass',
                            $a: {},
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                        },
                        testobjectA: {
                            $r: 'fatal',
                            $a: {},
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                            $d: {
                                testString: {
                                    $r: 'pass',
                                    $a: {},
                                    $v: {
                                        $r: 'pass',
                                        $m: null,
                                    },
                                },
                                testNumber: {
                                    $r: 'pass',
                                    $a: {},
                                    $v: {
                                        $r: 'pass',
                                        $m: null,
                                    },
                                },
                                testobjectB: {
                                    $r: 'fatal',
                                    $a: {},
                                    $v: {
                                        $r: 'pass',
                                        $m: null,
                                    },
                                    $d: {
                                        testStringB: {
                                            $r: 'fatal',
                                            $a: {
                                                flagged: {
                                                    value: 42,
                                                    result: 'fatal',
                                                    message: 'Failing Message',
                                                },
                                            },
                                            $v: {
                                                $r: 'pass',
                                                $m: null,
                                            },
                                        },
                                        testNumber: {
                                            $r: 'pass',
                                            $a: {},
                                            $v: {
                                                $r: 'pass',
                                                $m: null,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                });
            });
        });
    });

    describe('Blocking Test', () => {
        const structure = Structure.object({
            firstName: Structure.string()
                .aspect(Aspect.required())
                .aspect('isEven', (value) => {
                    return value.length % 2 === 0;
                }, {
                    require: [':required'],
                }),
            lastName: Structure.string()
                .aspect(Aspect.required())
                .aspect('matchOnEven', true, {
                    validator: (value, _, [firstIsEvent]) => {
                        if (!firstIsEvent) {
                            return null;
                        }

                        if (value.length % 2 === 0) {
                            return null;
                        }

                        return 'Also must be even';
                    },
                    require: ['$parent.firstName:isEven', ':required'],
                }),
        });

        it('All Null', () => {
            const value = {
                firstName: null,
                lastName: null,
            };

            return structure.run(value).then((result) => {
                expect(result.toJS()).to.eql({
                    $r: 'fatal',
                    $a: {},
                    $v: {
                        $r: 'pass',
                        $m: null,
                    },
                    $d: {
                        firstName: {
                            $r: 'fatal',
                            $a: {
                                required: {
                                    value: true,
                                    result: 'fatal',
                                    message: 'Required',
                                },
                                isEven: {
                                    value: null,
                                    result: 'blocked',
                                    message: null,
                                },
                            },
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                        },
                        lastName: {
                            $r: 'fatal',
                            $a: {
                                required: {
                                    value: true,
                                    result: 'fatal',
                                    message: 'Required',
                                },
                                matchOnEven: {
                                    value: null,
                                    result: 'blocked',
                                    message: null,
                                },
                            },
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                        },
                    },
                });
            });
        });

        it('last exists, is odd', () => {
            const value = {
                firstName: null,
                lastName: 'Doe',
            };

            return structure.run(value).then((result) => {
                expect(result.toJS()).to.eql({
                    $r: 'fatal',
                    $a: {},
                    $v: {
                        $r: 'pass',
                        $m: null,
                    },
                    $d: {
                        firstName: {
                            $r: 'fatal',
                            $a: {
                                required: {
                                    value: true,
                                    result: 'fatal',
                                    message: 'Required',
                                },
                                isEven: {
                                    value: null,
                                    result: 'blocked',
                                    message: null,
                                },
                            },
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                        },
                        lastName: {
                            $r: 'blocked',
                            $a: {
                                required: {
                                    value: true,
                                    result: 'pass',
                                    message: null,
                                },
                                matchOnEven: {
                                    value: null,
                                    result: 'blocked',
                                    message: null,
                                },
                            },
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                        },
                    },
                });
            });
        });

        it('first exists, is odd, last exists, is odd', () => {
            const value = {
                firstName: 'Jon',
                lastName: 'Doe',
            };

            return structure.run(value).then((result) => {
                expect(result.toJS()).to.eql({
                    $r: 'pass',
                    $a: {},
                    $v: {
                        $r: 'pass',
                        $m: null,
                    },
                    $d: {
                        firstName: {
                            $r: 'pass',
                            $a: {
                                required: {
                                    value: true,
                                    result: 'pass',
                                    message: null,
                                },
                                isEven: {
                                    value: false,
                                    result: 'pass',
                                    message: null,
                                },
                            },
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                        },
                        lastName: {
                            $r: 'pass',
                            $a: {
                                required: {
                                    value: true,
                                    result: 'pass',
                                    message: null,
                                },
                                matchOnEven: {
                                    value: true,
                                    result: 'pass',
                                    message: null,
                                },
                            },
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                        },
                    },
                });
            });
        });

        it('first exists, is even, last exists, is odd', () => {
            const value = {
                firstName: 'John',
                lastName: 'Doe',
            };

            return structure.run(value).then((result) => {
                expect(result.toJS()).to.eql({
                    $r: 'fatal',
                    $a: {},
                    $v: {
                        $r: 'pass',
                        $m: null,
                    },
                    $d: {
                        firstName: {
                            $r: 'pass',
                            $a: {
                                required: {
                                    value: true,
                                    result: 'pass',
                                    message: null,
                                },
                                isEven: {
                                    value: true,
                                    result: 'pass',
                                    message: null,
                                },
                            },
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                        },
                        lastName: {
                            $r: 'fatal',
                            $a: {
                                required: {
                                    value: true,
                                    result: 'pass',
                                    message: null,
                                },
                                matchOnEven: {
                                    value: true,
                                    result: 'fatal',
                                    message: 'Also must be even',
                                },
                            },
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                        },
                    },
                });
            });
        });

        it('first exists, is even, last exists, is even', () => {
            const value = {
                firstName: 'John',
                lastName: 'Does',
            };

            return structure.run(value).then((result) => {
                expect(result.toJS()).to.eql({
                    $r: 'pass',
                    $a: {},
                    $v: {
                        $r: 'pass',
                        $m: null,
                    },
                    $d: {
                        firstName: {
                            $r: 'pass',
                            $a: {
                                required: {
                                    value: true,
                                    result: 'pass',
                                    message: null,
                                },
                                isEven: {
                                    value: true,
                                    result: 'pass',
                                    message: null,
                                },
                            },
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                        },
                        lastName: {
                            $r: 'pass',
                            $a: {
                                required: {
                                    value: true,
                                    result: 'pass',
                                    message: null,
                                },
                                matchOnEven: {
                                    value: true,
                                    result: 'pass',
                                    message: null,
                                },
                            },
                            $v: {
                                $r: 'pass',
                                $m: null,
                            },
                        },
                    },
                });
            });
        });
    });
});
