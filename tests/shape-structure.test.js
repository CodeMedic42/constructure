import chai from 'chai';
import Promise from 'bluebird';
import Structure from '../src';
import Validator from '../src/validators/validator';
import Requirements from '../src/requirements';

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

const validator = (value, attributeValue) => buildValidatorMessage(value, attributeValue);

// function buildValidator(isFatal) {
//     return new Validator(({ value, attributeValue }) => buildValidatorMessage(value, attributeValue), isFatal);
// }

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
                    .attributes({
                        flagged: Structure.attribute(attributeValue),
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
                            flagged: buildFlaggedResult(attributeValue, 'pass', null),
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
                    .attributes({
                        flagged: Structure.attribute(),
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
                    .attributes({
                        flagged: Structure.attribute(() => attributeValue),
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
                            flagged: buildFlaggedResult(attributeValue, 'pass', null),
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
                    .attributes({
                        flagged: Structure.attribute(() => undefined),
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
                    .attributes({
                        flagged: Structure.attribute(Promise.delay(500).then(() => null)),
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
    
        describe('With Requirements', () => {
            describe('Internal Requirements', () => {
                it('Static Property Attribute flagged => requiredAttA', () => {
                    const structure = Structure.shape({
                        testString: Structure.string()
                            .attributes({
                                flagged: Structure.attribute((value, requirements) => {
                                    expect(value).to.equal('test');
                                    expect(requirements).to.eql([42]);
    
                                    return attributeValue;
                                })
                                    .setRequirements([':requiredAttA']),
                                requiredAttA: Structure.attribute(42),
                            })
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
                            .attributes({
                                requiredAttB: Structure.attribute('foo'),
                                flagged: Structure.attribute((value, requirements) => {
                                    expect(value).to.equal('test');
                                    expect(requirements).to.eql([42, 'foo']);
    
                                    return attributeValue;
                                })
                                    .setRequirements([':requiredAttA', ':requiredAttB']),
                                requiredAttA: Structure.attribute(42)
                                    .setRequirements([':requiredAttB']),
                            })
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
                            .attributes({
                                requiredAttA: Structure.attribute(42),
                            })
                    })
                    .attributes({
                        flagged: Structure.attribute((value, requirements) => {
                            expect(value).to.eql({
                                testString: 'test'
                            });
                            expect(requirements).to.eql([42]);
    
                            return attributeValue;
                        })
                            .setRequirements(['testString:requiredAttA']),
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
                            .attributes({
                                requiredAttA: Structure.attribute(42)
                                    .setRequirements(['$parent.testNumber:requiredAttB']),
                            }),
                        testNumber: Structure.number()
                            .attributes({
                                requiredAttB: Structure.attribute('foo'),
                            }),
                    })
                    .attributes({
                        flagged: Structure.attribute((value, requirements) => {
                            expect(value).to.eql({
                                testString: 'test',
                                testNumber: 237
                            });
                            expect(requirements).to.eql([42, 'foo']);
    
                            return attributeValue;
                        })
                            .setRequirements(['testString:requiredAttA', 'testNumber:requiredAttB']),
                    });
    
                    const value = {
                        testString: 'test',
                        testNumber: 237
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
                        }
                    }
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
                    }   
                }
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
                        }
                    }
                });
            });
        });

        it('Deep Failing Validation with Requirements', () => {
            const isFatal = true;

            const structure = Structure.shape({
                testString: Structure.string()
                    .attributes({
                        requiredAttA: Structure.attribute('foo')
                    }),
                testNumber: Structure.number(),
                testShape: Structure.shape({
                    testString: Structure.string(),
                    testNumber: Structure.number(),
                    testShape: Structure.shape({
                        testString: Structure.string()
                            .attributes({
                                flagged: Structure.attribute((value, requirements) => {
                                    expect(value).to.eql('test');
                                    expect(requirements).to.eql(['foo']);
            
                                    return attributeValue;
                                })
                                    .setValidator((value, attributeValueResult, requirements) => {
                                        expect(value).to.eql('test');
                                        expect(attributeValueResult).to.eql(attributeValue);
                                        expect(requirements).to.eql(['foo']);
                
                                        return 'Failing Message';
                                    }, isFatal)
                                    .setRequirements(['$root.testString:requiredAttA'])
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
                    }   
                }
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
                                message: null 
                            }
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
                                        message: 'Failing Message' 
                                    }
                                },
                            },
                            testNumber: {
                                $r: 'pass',
                                $a: {},
                            },
                        }
                    }
                });
            });
        });
    });
});
