import chai from 'chai';
import Promise from 'bluebird';
import Structure, {} from '../src';

const { expect } = chai;

const attributeValue = 42;

function buildFlaggedResult(value, result, message) {
    return { value, result, message };
}

function buildValidatorMessage(value, attributeResultValue) {
    return `value:${value} attributeValue:${attributeResultValue}`;
}

const onValidate = (value, attributeResultValue) => buildValidatorMessage(
    value,
    attributeResultValue,
);

describe('Shape Structure', () => {
    describe('Simple Structure', () => {
        it('Basic Property Attribute', () => {
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

        it('Static Property Attribute', () => {
            const structure = Structure.shape({
                testString: Structure.string()
                    .aspect('flagged', attributeValue),
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
                            flagged: buildFlaggedResult(attributeValue, 'pass', null),
                        },
                    },
                });
            });
        });

        it('Null Static Property Attribute', () => {
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

        it('Undefined Static Property Attribute', () => {
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

        it('Dynamic Property Attribute', () => {
            const structure = Structure.shape({
                testString: Structure.string()
                    .aspect('flagged', () => attributeValue),
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
                            flagged: buildFlaggedResult(attributeValue, 'pass', null),
                        },
                    },
                });
            });
        });

        it('Null Dynamic Property Attribute', () => {
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

        it('Undefined Dynamic Property Attribute', () => {
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

        it('Async Property Attribute', () => {
            const structure = Structure.shape({
                testString: Structure.string()
                    .aspect('flagged', () => Promise.delay(500).then(() => attributeValue)),
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
                            flagged: buildFlaggedResult(attributeValue, 'pass', null),
                        },
                    },
                });
            });
        });

        it('Null Async Property Attribute', () => {
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

        it('Undefined Async Property Attribute', () => {
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
                    it('Null Static Property Attribute', () => {
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

                    it('Undefined Static Property Attribute', () => {
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

                    it('Static Property Attribute', () => {
                        const structure = Structure.shape({
                            testString: Structure.string()
                                .aspect('flagged', attributeValue, {
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
                                            attributeValue,
                                            fatalType,
                                            buildValidatorMessage(
                                                value.testString,
                                                attributeValue,
                                            ),
                                        ),
                                    },
                                },
                            });
                        });
                    });

                    it('Null Dynamic Property Attribute', () => {
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

                    it('Undefined Dynamic Property Attribute', () => {
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

                    it('Dynamic Property Attribute', () => {
                        const structure = Structure.shape({
                            testString: Structure.string()
                                .aspect('flagged', () => attributeValue, {
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
                                            attributeValue,
                                            fatalType,
                                            buildValidatorMessage(
                                                value.testString,
                                                attributeValue,
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
                it('Static Property Attribute flagged => requiredAttA', () => {
                    const structure = Structure.shape({
                        testString: Structure.string()
                            .aspect(
                                'flagged',
                                (value, requirements) => {
                                    expect(value).to.equal('test');
                                    expect(requirements).to.eql([42]);

                                    return attributeValue;
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
                                    flagged: buildFlaggedResult(attributeValue, 'pass', null),
                                    requiredAttA: buildFlaggedResult(42, 'pass', null),
                                },
                            },
                        });
                    });
                });

                it('Static Property Attribute flagged => requiredAttA => requiredAttB', () => {
                    const structure = Structure.shape({
                        testString: Structure.string()
                            .aspect(
                                'flagged',
                                (value, requirements) => {
                                    expect(value).to.equal('test');
                                    expect(requirements).to.eql([42, 'foo']);

                                    return attributeValue;
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
                                    flagged: buildFlaggedResult(attributeValue, 'pass', null),
                                    requiredAttA: buildFlaggedResult(42, 'pass', null),
                                    requiredAttB: buildFlaggedResult('foo', 'pass', null),
                                },
                            },
                        });
                    });
                });
            });

            describe('Child Requirements', () => {
                it('Static Property Attribute flagged => requiredAttA', () => {
                    const structure = Structure.shape({
                        testString: Structure.string()
                            .aspect('requiredAttA', 42),
                    })
                        .aspect('flagged', (value, requirements) => {
                            expect(value).to.eql({
                                testString: 'test',
                            });
                            expect(requirements).to.eql([42]);

                            return attributeValue;
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
                                flagged: buildFlaggedResult(attributeValue, 'pass', null),
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

                it('Static Property Attribute flagged => requiredAttA => requiredAttB', () => {
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

                            return attributeValue;
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
                                flagged: buildFlaggedResult(attributeValue, 'pass', null),
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

                                return attributeValue;
                            }, {
                                validator: (value, attributeValueResult, requirements) => {
                                    expect(value).to.eql('test');
                                    expect(attributeValueResult).to.eql(attributeValue);
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
