import chai from 'chai';
import Promise from 'bluebird';
import Structure, {} from '../src';

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

describe('Shape Structure', () => {
    describe('Simple Structure', () => {
        it('Basic Property Aspect', () => {
            const structure = Structure.shape({
                testString: Structure.string(),
            });

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
                });
            });
        });

        it('Static Property Aspect', () => {
            const structure = Structure.shape({
                testString: Structure.string()
                    .aspect('flagged', aspectValue),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: 'pass',
                    $a: {},
                    testString: {
                        $r: 'pass',
                        $a: {
                            flagged: buildFlaggedResult(aspectValue, 'pass', null),
                        },
                    },
                });
            });
        });

        it('Null Static Property Aspect', () => {
            const structure = Structure.shape({
                testString: Structure.string()
                    .aspect('flagged', null),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: 'pass',
                    $a: {},
                    testString: {
                        $r: 'pass',
                        $a: {
                            flagged: buildFlaggedResult(null, 'pass', null),
                        },
                    },
                });
            });
        });

        it('Undefined Static Property Aspect', () => {
            const structure = Structure.shape({
                testString: Structure.string()
                    .aspect('flagged', undefined),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: 'pass',
                    $a: {},
                    testString: {
                        $r: 'pass',
                        $a: {
                            flagged: buildFlaggedResult(null, 'pass', null),
                        },
                    },
                });
            });
        });

        it('Dynamic Property Aspect', () => {
            const structure = Structure.shape({
                testString: Structure.string()
                    .aspect('flagged', () => aspectValue),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: 'pass',
                    $a: {},
                    testString: {
                        $r: 'pass',
                        $a: {
                            flagged: buildFlaggedResult(aspectValue, 'pass', null),
                        },
                    },
                });
            });
        });

        it('Null Dynamic Property Aspect', () => {
            const structure = Structure.shape({
                testString: Structure.string()
                    .aspect('flagged', () => null),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: 'pass',
                    $a: {},
                    testString: {
                        $r: 'pass',
                        $a: {
                            flagged: buildFlaggedResult(null, 'pass', null),
                        },
                    },
                });
            });
        });

        it('Undefined Dynamic Property Aspect', () => {
            const structure = Structure.shape({
                testString: Structure.string()
                    .aspect('flagged', () => undefined),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: 'pass',
                    $a: {},
                    testString: {
                        $r: 'pass',
                        $a: {
                            flagged: buildFlaggedResult(null, 'pass', null),
                        },
                    },
                });
            });
        });

        it('Async Property Aspect', () => {
            const structure = Structure.shape({
                testString: Structure.string()
                    .aspect('flagged', () => Promise.delay(500).then(() => aspectValue)),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: 'pass',
                    $a: {},
                    testString: {
                        $r: 'pass',
                        $a: {
                            flagged: buildFlaggedResult(aspectValue, 'pass', null),
                        },
                    },
                });
            });
        });

        it('Null Async Property Aspect', () => {
            const structure = Structure.shape({
                testString: Structure.string()
                    .aspect('flagged', () => Promise.delay(500).then(() => null)),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: 'pass',
                    $a: {},
                    testString: {
                        $r: 'pass',
                        $a: {
                            flagged: buildFlaggedResult(null, 'pass', null),
                        },
                    },
                });
            });
        });

        it('Undefined Async Property Aspect', () => {
            const structure = Structure.shape({
                testString: Structure.string()
                    .aspect('flagged', () => Promise.delay(500).then(() => undefined)),
            });

            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: 'pass',
                    $a: {},
                    testString: {
                        $r: 'pass',
                        $a: {
                            flagged: buildFlaggedResult(null, 'pass', null),
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
                        const structure = Structure.shape({
                            testString: Structure.string()
                                .aspect('flagged', null, {
                                    validator: { onValidate, isFatal },
                                }),
                        });

                        const value = {
                            testString: 'test',
                        };

                        return structure.run(value).then((result) => {
                            expect(result).to.eql({
                                $r: 'pass',
                                $a: {},
                                testString: {
                                    $r: 'pass',
                                    $a: {
                                        flagged: buildFlaggedResult(null, 'pass', null),
                                    },
                                },
                            });
                        });
                    });

                    it('Undefined Static Property Aspect', () => {
                        const structure = Structure.shape({
                            testString: Structure.string()
                                .aspect('flagged', undefined, {
                                    validator: { onValidate, isFatal },
                                }),
                        });

                        const value = {
                            testString: 'test',
                        };

                        return structure.run(value).then((result) => {
                            expect(result).to.eql({
                                $r: 'pass',
                                $a: {},
                                testString: {
                                    $r: 'pass',
                                    $a: {
                                        flagged: buildFlaggedResult(null, 'pass', null),
                                    },
                                },
                            });
                        });
                    });

                    it('Static Property Aspect', () => {
                        const structure = Structure.shape({
                            testString: Structure.string()
                                .aspect('flagged', aspectValue, {
                                    validator: { onValidate, isFatal },
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
                                        flagged: buildFlaggedResult(
                                            aspectValue,
                                            fatalType,
                                            buildValidatorMessage(
                                                value.testString,
                                                aspectValue,
                                            ),
                                        ),
                                    },
                                },
                            });
                        });
                    });

                    it('Null Dynamic Property Aspect', () => {
                        const structure = Structure.shape({
                            testString: Structure.string()
                                .aspect('flagged', () => null, {
                                    validator: { onValidate, isFatal },
                                }),
                        });

                        const value = {
                            testString: 'test',
                        };

                        return structure.run(value).then((result) => {
                            expect(result).to.eql({
                                $r: 'pass',
                                $a: {},
                                testString: {
                                    $r: 'pass',
                                    $a: {
                                        flagged: buildFlaggedResult(null, 'pass', null),
                                    },
                                },
                            });
                        });
                    });

                    it('Undefined Dynamic Property Aspect', () => {
                        const structure = Structure.shape({
                            testString: Structure.string()
                                .aspect('flagged', () => undefined, {
                                    validator: { onValidate, isFatal },
                                }),
                        });

                        const value = {
                            testString: 'test',
                        };

                        return structure.run(value).then((result) => {
                            expect(result).to.eql({
                                $r: 'pass',
                                $a: {},
                                testString: {
                                    $r: 'pass',
                                    $a: {
                                        flagged: buildFlaggedResult(null, 'pass', null),
                                    },
                                },
                            });
                        });
                    });

                    it('Dynamic Property Aspect', () => {
                        const structure = Structure.shape({
                            testString: Structure.string()
                                .aspect('flagged', () => aspectValue, {
                                    validator: { onValidate, isFatal },
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
                                        flagged: buildFlaggedResult(
                                            aspectValue,
                                            fatalType,
                                            buildValidatorMessage(
                                                value.testString,
                                                aspectValue,
                                            ),
                                        ),
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
                    const structure = Structure.shape({
                        testString: Structure.string()
                            .aspect(
                                'flagged',
                                (value, requirements) => {
                                    expect(value).to.equal('test');
                                    expect(requirements).to.eql([42]);

                                    return aspectValue;
                                }, {
                                    requirements: [':requiredAttA'],
                                },
                            )
                            .aspect('requiredAttA', 42),
                    });

                    const value = {
                        testString: 'test',
                    };

                    return structure.run(value).then((result) => {
                        expect(result).to.eql({
                            $r: 'pass',
                            $a: {},
                            testString: {
                                $r: 'pass',
                                $a: {
                                    flagged: buildFlaggedResult(aspectValue, 'pass', null),
                                    requiredAttA: buildFlaggedResult(42, 'pass', null),
                                },
                            },
                        });
                    });
                });

                it('Static Property Aspect flagged => requiredAttA => requiredAttB', () => {
                    const structure = Structure.shape({
                        testString: Structure.string()
                            .aspect(
                                'flagged',
                                (value, requirements) => {
                                    expect(value).to.equal('test');
                                    expect(requirements).to.eql([42, 'foo']);

                                    return aspectValue;
                                }, {
                                    requirements: [':requiredAttA', ':requiredAttB'],
                                },
                            )
                            .aspect('requiredAttA', 42, {
                                requirements: [':requiredAttB'],
                            })
                            .aspect('requiredAttB', 'foo'),
                    });

                    const value = {
                        testString: 'test',
                    };

                    return structure.run(value).then((result) => {
                        expect(result).to.eql({
                            $r: 'pass',
                            $a: {},
                            testString: {
                                $r: 'pass',
                                $a: {
                                    flagged: buildFlaggedResult(aspectValue, 'pass', null),
                                    requiredAttA: buildFlaggedResult(42, 'pass', null),
                                    requiredAttB: buildFlaggedResult('foo', 'pass', null),
                                },
                            },
                        });
                    });
                });
            });

            describe('Child Requirements', () => {
                it('Static Property Aspect flagged => requiredAttA', () => {
                    const structure = Structure.shape({
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
                            requirements: ['testString:requiredAttA'],
                        });

                    const value = {
                        testString: 'test',
                    };

                    return structure.run(value).then((result) => {
                        expect(result).to.eql({
                            $r: 'pass',
                            $a: {
                                flagged: buildFlaggedResult(aspectValue, 'pass', null),
                            },
                            testString: {
                                $r: 'pass',
                                $a: {
                                    requiredAttA: buildFlaggedResult(42, 'pass', null),
                                },
                            },
                        });
                    });
                });

                it('Static Property Aspect flagged => requiredAttA => requiredAttB', () => {
                    const structure = Structure.shape({
                        testString: Structure.string()
                            .aspect('requiredAttA', 42, {
                                requirements: ['$parent.testNumber:requiredAttB'],
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
                            requirements: ['testString:requiredAttA', 'testNumber:requiredAttB'],
                        });

                    const value = {
                        testString: 'test',
                        testNumber: 237,
                    };

                    return structure.run(value).then((result) => {
                        expect(result).to.eql({
                            $r: 'pass',
                            $a: {
                                flagged: buildFlaggedResult(aspectValue, 'pass', null),
                            },
                            testString: {
                                $r: 'pass',
                                $a: {
                                    requiredAttA: buildFlaggedResult(42, 'pass', null),
                                },
                            },
                            testNumber: {
                                $r: 'pass',
                                $a: {
                                    requiredAttB: buildFlaggedResult('foo', 'pass', null),
                                },
                            },
                        });
                    });
                });
            });
        });
    });

    describe('Deep Structure', () => {
        it('Null shape', () => {
            const structure = Structure.shape({
                testString: Structure.string(),
                testNumber: Structure.number(),
                testShape: Structure.shape({
                    testString: Structure.string(),
                    testNumber: Structure.number(),
                    testShape: Structure.shape({
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
                expect(result).to.eql({
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
                    testShape: {
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
                        testShape: {
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
                    },
                });
            });
        });

        it('Full shape', () => {
            const structure = Structure.shape({
                testString: Structure.string(),
                testNumber: Structure.number(),
                testShape: Structure.shape({
                    testString: Structure.string(),
                    testNumber: Structure.number(),
                    testShape: Structure.shape({
                        testString: Structure.string(),
                        testNumber: Structure.number(),
                    }),
                }),
            });

            const value = {
                testString: 'test',
                testNumber: 42,
                testShape: {
                    testString: 'test',
                    testNumber: 42,
                    testShape: {
                        testString: 'test',
                        testNumber: 42,
                    },
                },
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
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
                    testShape: {
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
                        testShape: {
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
                    },
                });
            });
        });

        it('Deep Failing Validation with Requirements', () => {
            const structure = Structure.shape({
                testString: Structure.string()
                    .aspect('requiredAttA', 'foo'),
                testNumber: Structure.number(),
                testShape: Structure.shape({
                    testString: Structure.string(),
                    testNumber: Structure.number(),
                    testShape: Structure.shape({
                        testString: Structure.string()
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
                                requirements: ['$root.testString:requiredAttA'],
                            }),
                        testNumber: Structure.number(),
                    }),
                }),
            });

            const value = {
                testString: 'test',
                testNumber: 42,
                testShape: {
                    testString: 'test',
                    testNumber: 42,
                    testShape: {
                        testString: 'test',
                        testNumber: 42,
                    },
                },
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: 'fatal',
                    $a: {},
                    testString: {
                        $r: 'pass',
                        $a: {
                            requiredAttA: {
                                value: 'foo',
                                result: 'pass',
                                message: null,
                            },
                        },
                    },
                    testNumber: {
                        $r: 'pass',
                        $a: {},
                    },
                    testShape: {
                        $r: 'fatal',
                        $a: {},
                        testString: {
                            $r: 'pass',
                            $a: {},
                        },
                        testNumber: {
                            $r: 'pass',
                            $a: {},
                        },
                        testShape: {
                            $r: 'fatal',
                            $a: {},
                            testString: {
                                $r: 'fatal',
                                $a: {
                                    flagged: {
                                        value: 42,
                                        result: 'fatal',
                                        message: 'Failing Message',
                                    },
                                },
                            },
                            testNumber: {
                                $r: 'pass',
                                $a: {},
                            },
                        },
                    },
                });
            });
        });
    });
});
