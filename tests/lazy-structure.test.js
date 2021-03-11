import chai from 'chai';
import isNil from 'lodash/isNil';
import Structure, { Aspect, VerificationError } from '../src';

const { expect } = chai;

xdescribe('Lazy Structure', () => {
    const structure = Structure.object({
        testString: Structure.string()
            .aspect(Aspect.required()),
        levelA: Structure.object({
            levelB: Structure.lazy(() => structure)
                .aspect('aspB', 'test'),
        }),
    })
        .aspect('aspC', 42, {
            validator: (value) => {
                return isNil(value.levelA) ? 'level A Required' : null;
            },
        });

    it('levelA null', () => {
        const value = {
            testString: 'test',
            levelA: null,
        };

        return structure.run(value).then((result) => {
            const ret = result.toJS();

            expect(ret).to.eql({
                $r: 'fatal',
                $a: {
                    aspC: {
                        value: 42,
                        result: 'fatal',
                        message: 'level A Required',
                    },
                },
                $d: {
                    testString: {
                        $r: 'pass',
                        $a: {
                            required: {
                                value: true,
                                result: 'pass',
                                message: null,
                            },
                        },
                    },
                    levelA: {
                        $r: 'pass',
                        $a: {},
                        $d: {
                            levelB: {
                                $r: 'pass',
                                $a: {
                                    aspB: {
                                        value: 'test',
                                        result: 'pass',
                                        message: null,
                                    },
                                },
                            },
                        },
                    },
                },
            });
        });
    });

    it('levelB undefined', () => {
        const value = {
            testString: 'test',
            levelA: {},
        };

        return structure.run(value).then((result) => {
            expect(result.toJS()).to.eql({
                $r: 'pass',
                $a: {
                    aspC: {
                        value: 42,
                        result: 'pass',
                        message: null,
                    },
                },
                $d: {
                    testString: {
                        $r: 'pass',
                        $a: {
                            required: {
                                value: true,
                                result: 'pass',
                                message: null,
                            },
                        },
                    },
                    levelA: {
                        $r: 'pass',
                        $a: {},
                        $d: {
                            levelB: {
                                $r: 'pass',
                                $a: {
                                    aspB: {
                                        value: 'test',
                                        result: 'pass',
                                        message: null,
                                    },
                                },
                            },
                        },
                    },
                },
            });
        });
    });

    it('levelB null', () => {
        const value = {
            testString: 'test',
            levelA: {
                levelB: null,
            },
        };

        return structure.run(value).then((result) => {
            expect(result.toJS()).to.eql({
                $r: 'pass',
                $a: {
                    aspC: {
                        value: 42,
                        result: 'pass',
                        message: null,
                    },
                },
                $d: {
                    testString: {
                        $r: 'pass',
                        $a: {
                            required: {
                                value: true,
                                result: 'pass',
                                message: null,
                            },
                        },
                    },
                    levelA: {
                        $r: 'pass',
                        $a: {},
                        $d: {
                            levelB: {
                                $r: 'pass',
                                $a: {
                                    aspB: {
                                        value: 'test',
                                        result: 'pass',
                                        message: null,
                                    },
                                },
                            },
                        },
                    },
                },
            });
        });
    });

    it('levelB exists', () => {
        const value = {
            testString: 'test',
            levelA: {
                levelB: {
                    testString: 'test',
                },
            },
        };

        return structure.run(value).then((result) => {
            expect(result.toJS()).to.eql({
                $r: 'fatal',
                $a: {
                    aspC: {
                        value: 42,
                        result: 'pass',
                        message: null,
                    },
                },
                $d: {
                    testString: {
                        $r: 'pass',
                        $a: {
                            required: {
                                value: true,
                                result: 'pass',
                                message: null,
                            },
                        },
                    },
                    levelA: {
                        $r: 'fatal',
                        $a: {},
                        $d: {
                            levelB: {
                                $r: 'fatal',
                                $a: {
                                    aspB: {
                                        value: 'test',
                                        result: 'pass',
                                        message: null,
                                    },
                                    aspC: {
                                        value: 42,
                                        result: 'fatal',
                                        message: 'level A Required',
                                    },
                                },
                                $d: {
                                    testString: {
                                        $r: 'pass',
                                        $a: {
                                            required: {
                                                value: true,
                                                result: 'pass',
                                                message: null,
                                            },
                                        },
                                    },
                                    levelA: {
                                        $r: 'pass',
                                        $a: {},
                                        $d: {
                                            levelB: {
                                                $r: 'pass',
                                                $a: {
                                                    aspB: {
                                                        value: 'test',
                                                        result: 'pass',
                                                        message: null,
                                                    },
                                                },
                                            },
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

    it('levelB.levelA null', () => {
        const value = {
            testString: 'test',
            levelA: {
                levelB: {
                    testString: 'test',
                    levelA: null,
                },
            },
        };

        return structure.run(value).then((result) => {
            expect(result.toJS()).to.eql({
                $r: 'fatal',
                $a: {
                    aspC: {
                        value: 42,
                        result: 'pass',
                        message: null,
                    },
                },
                $d: {
                    testString: {
                        $r: 'pass',
                        $a: {
                            required: {
                                value: true,
                                result: 'pass',
                                message: null,
                            },
                        },
                    },
                    levelA: {
                        $r: 'fatal',
                        $a: {},
                        $d: {
                            levelB: {
                                $r: 'fatal',
                                $a: {
                                    aspB: {
                                        value: 'test',
                                        result: 'pass',
                                        message: null,
                                    },
                                    aspC: {
                                        value: 42,
                                        result: 'fatal',
                                        message: 'level A Required',
                                    },
                                },
                                $d: {
                                    testString: {
                                        $r: 'pass',
                                        $a: {
                                            required: {
                                                value: true,
                                                result: 'pass',
                                                message: null,
                                            },
                                        },
                                    },
                                    levelA: {
                                        $r: 'pass',
                                        $a: {},
                                        $d: {
                                            levelB: {
                                                $r: 'pass',
                                                $a: {
                                                    aspB: {
                                                        value: 'test',
                                                        result: 'pass',
                                                        message: null,
                                                    },
                                                },
                                            },
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

    it('levelB.levelA.levelB undefined', () => {
        const value = {
            testString: 'test',
            levelA: {
                levelB: {
                    testString: 'test',
                    levelA: {},
                },
            },
        };

        return structure.run(value).then((result) => {
            expect(result.toJS()).to.eql({
                $r: 'pass',
                $a: {
                    aspC: {
                        value: 42,
                        result: 'pass',
                        message: null,
                    },
                },
                $d: {
                    testString: {
                        $r: 'pass',
                        $a: {
                            required: {
                                value: true,
                                result: 'pass',
                                message: null,
                            },
                        },
                    },
                    levelA: {
                        $r: 'pass',
                        $a: {},
                        $d: {
                            levelB: {
                                $r: 'pass',
                                $a: {
                                    aspB: {
                                        value: 'test',
                                        result: 'pass',
                                        message: null,
                                    },
                                    aspC: {
                                        value: 42,
                                        result: 'pass',
                                        message: null,
                                    },
                                },
                                $d: {
                                    testString: {
                                        $r: 'pass',
                                        $a: {
                                            required: {
                                                value: true,
                                                result: 'pass',
                                                message: null,
                                            },
                                        },
                                    },
                                    levelA: {
                                        $r: 'pass',
                                        $a: {},
                                        $d: {
                                            levelB: {
                                                $r: 'pass',
                                                $a: {
                                                    aspB: {
                                                        value: 'test',
                                                        result: 'pass',
                                                        message: null,
                                                    },
                                                },
                                            },
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

    it('levelB.levelA.levelB null', () => {
        const value = {
            testString: 'test',
            levelA: {
                levelB: {
                    testString: 'test',
                    levelA: {
                        levelB: null,
                    },
                },
            },
        };

        return structure.run(value).then((result) => {
            expect(result.toJS()).to.eql({
                $r: 'pass',
                $a: {
                    aspC: {
                        value: 42,
                        result: 'pass',
                        message: null,
                    },
                },
                $d: {
                    testString: {
                        $r: 'pass',
                        $a: {
                            required: {
                                value: true,
                                result: 'pass',
                                message: null,
                            },
                        },
                    },
                    levelA: {
                        $r: 'pass',
                        $a: {},
                        $d: {
                            levelB: {
                                $r: 'pass',
                                $a: {
                                    aspB: {
                                        value: 'test',
                                        result: 'pass',
                                        message: null,
                                    },
                                    aspC: {
                                        value: 42,
                                        result: 'pass',
                                        message: null,
                                    },
                                },
                                $d: {
                                    testString: {
                                        $r: 'pass',
                                        $a: {
                                            required: {
                                                value: true,
                                                result: 'pass',
                                                message: null,
                                            },
                                        },
                                    },
                                    levelA: {
                                        $r: 'pass',
                                        $a: {},
                                        $d: {
                                            levelB: {
                                                $r: 'pass',
                                                $a: {
                                                    aspB: {
                                                        value: 'test',
                                                        result: 'pass',
                                                        message: null,
                                                    },
                                                },
                                            },
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

    it('levelB.levelA.levelB exists', () => {
        const value = {
            testString: 'test',
            levelA: {
                levelB: {
                    testString: 'test',
                    levelA: {
                        levelB: {},
                    },
                },
            },
        };

        return structure.run(value).then((result) => {
            expect(result.toJS()).to.eql({
                $r: 'fatal',
                $a: {
                    aspC: {
                        value: 42,
                        result: 'pass',
                        message: null,
                    },
                },
                $d: {
                    testString: {
                        $r: 'pass',
                        $a: {
                            required: {
                                value: true,
                                result: 'pass',
                                message: null,
                            },
                        },
                    },
                    levelA: {
                        $r: 'fatal',
                        $a: {},
                        $d: {
                            levelB: {
                                $r: 'fatal',
                                $a: {
                                    aspB: {
                                        value: 'test',
                                        result: 'pass',
                                        message: null,
                                    },
                                    aspC: {
                                        value: 42,
                                        result: 'pass',
                                        message: null,
                                    },
                                },
                                $d: {
                                    testString: {
                                        $r: 'pass',
                                        $a: {
                                            required: {
                                                value: true,
                                                result: 'pass',
                                                message: null,
                                            },
                                        },
                                    },
                                    levelA: {
                                        $r: 'fatal',
                                        $a: {},
                                        $d: {
                                            levelB: {
                                                $r: 'fatal',
                                                $a: {
                                                    aspB: {
                                                        value: 'test',
                                                        result: 'pass',
                                                        message: null,
                                                    },
                                                    aspC: {
                                                        value: 42,
                                                        result: 'fatal',
                                                        message: 'level A Required',
                                                    },
                                                },
                                                $d: {
                                                    testString: {
                                                        $r: 'fatal',
                                                        $a: {
                                                            required: {
                                                                value: true,
                                                                result: 'fatal',
                                                                message: 'Required',
                                                            },
                                                        },
                                                    },
                                                    levelA: {
                                                        $r: 'pass',
                                                        $a: {},
                                                        $d: {
                                                            levelB: {
                                                                $r: 'pass',
                                                                $a: {
                                                                    aspB: {
                                                                        value: 'test',
                                                                        result: 'pass',
                                                                        message: null,
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    },
                                                },
                                            },
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

    it('levelB.levelA.levelB fail Verify', () => {
        const value = {
            testString: 'test',
            levelA: {
                levelB: {
                    testString: 'test',
                    levelA: {
                        levelB: 42,
                    },
                },
            },
        };

        return expect(structure.run(value))
            .to.be.rejectedWith(VerificationError, 'Must be an object')
            .then((error) => {
                expect(error.path).to.eql(['levelA', 'levelB', 'levelA', 'levelB']);
            });
    });
});
