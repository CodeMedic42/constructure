import chai from 'chai';
import isNil from 'lodash/isNil';
import Structure, { Aspect, VerificationError } from '../src';

const { expect } = chai;

describe('Lazy Structure', () => {
    const structure = Structure.shape({
        testString: Structure.string()
            .aspect('aspA', Aspect.required()),
        levelA: Structure.shape({
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
            expect(result).to.eql({
                $r: 'fatal',
                $a: {
                    aspC: {
                        value: 42,
                        result: 'fatal',
                        message: 'level A Required',
                    },
                },
                testString: {
                    $r: 'pass',
                    $a: {
                        aspA: {
                            value: true,
                            result: 'pass',
                            message: null,
                        },
                    },
                },
                levelA: {
                    $r: 'pass',
                    $a: {},
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
            });
        });
    });

    it('levelB undefined', () => {
        const value = {
            testString: 'test',
            levelA: {},
        };

        return structure.run(value).then((result) => {
            expect(result).to.eql({
                $r: 'pass',
                $a: {
                    aspC: {
                        value: 42,
                        result: 'pass',
                        message: null,
                    },
                },
                testString: {
                    $r: 'pass',
                    $a: {
                        aspA: {
                            value: true,
                            result: 'pass',
                            message: null,
                        },
                    },
                },
                levelA: {
                    $r: 'pass',
                    $a: {},
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
            expect(result).to.eql({
                $r: 'pass',
                $a: {
                    aspC: {
                        value: 42,
                        result: 'pass',
                        message: null,
                    },
                },
                testString: {
                    $r: 'pass',
                    $a: {
                        aspA: {
                            value: true,
                            result: 'pass',
                            message: null,
                        },
                    },
                },
                levelA: {
                    $r: 'pass',
                    $a: {},
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
            expect(result).to.eql({
                $r: 'fatal',
                $a: {
                    aspC: {
                        value: 42,
                        result: 'pass',
                        message: null,
                    },
                },
                testString: {
                    $r: 'pass',
                    $a: {
                        aspA: {
                            value: true,
                            result: 'pass',
                            message: null,
                        },
                    },
                },
                levelA: {
                    $r: 'fatal',
                    $a: {},
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
                        testString: {
                            $r: 'pass',
                            $a: {
                                aspA: {
                                    value: true,
                                    result: 'pass',
                                    message: null,
                                },
                            },
                        },
                        levelA: {
                            $r: 'pass',
                            $a: {},
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
            expect(result).to.eql({
                $r: 'fatal',
                $a: {
                    aspC: {
                        value: 42,
                        result: 'pass',
                        message: null,
                    },
                },
                testString: {
                    $r: 'pass',
                    $a: {
                        aspA: {
                            value: true,
                            result: 'pass',
                            message: null,
                        },
                    },
                },
                levelA: {
                    $r: 'fatal',
                    $a: {},
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
                        testString: {
                            $r: 'pass',
                            $a: {
                                aspA: {
                                    value: true,
                                    result: 'pass',
                                    message: null,
                                },
                            },
                        },
                        levelA: {
                            $r: 'pass',
                            $a: {},
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
            expect(result).to.eql({
                $r: 'pass',
                $a: {
                    aspC: {
                        value: 42,
                        result: 'pass',
                        message: null,
                    },
                },
                testString: {
                    $r: 'pass',
                    $a: {
                        aspA: {
                            value: true,
                            result: 'pass',
                            message: null,
                        },
                    },
                },
                levelA: {
                    $r: 'pass',
                    $a: {},
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
                        testString: {
                            $r: 'pass',
                            $a: {
                                aspA: {
                                    value: true,
                                    result: 'pass',
                                    message: null,
                                },
                            },
                        },
                        levelA: {
                            $r: 'pass',
                            $a: {},
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
            expect(result).to.eql({
                $r: 'pass',
                $a: {
                    aspC: {
                        value: 42,
                        result: 'pass',
                        message: null,
                    },
                },
                testString: {
                    $r: 'pass',
                    $a: {
                        aspA: {
                            value: true,
                            result: 'pass',
                            message: null,
                        },
                    },
                },
                levelA: {
                    $r: 'pass',
                    $a: {},
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
                        testString: {
                            $r: 'pass',
                            $a: {
                                aspA: {
                                    value: true,
                                    result: 'pass',
                                    message: null,
                                },
                            },
                        },
                        levelA: {
                            $r: 'pass',
                            $a: {},
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
            expect(result).to.eql({
                $r: 'fatal',
                $a: {
                    aspC: {
                        value: 42,
                        result: 'pass',
                        message: null,
                    },
                },
                testString: {
                    $r: 'pass',
                    $a: {
                        aspA: {
                            value: true,
                            result: 'pass',
                            message: null,
                        },
                    },
                },
                levelA: {
                    $r: 'fatal',
                    $a: {},
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
                        testString: {
                            $r: 'pass',
                            $a: {
                                aspA: {
                                    value: true,
                                    result: 'pass',
                                    message: null,
                                },
                            },
                        },
                        levelA: {
                            $r: 'fatal',
                            $a: {},
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
                                testString: {
                                    $r: 'fatal',
                                    $a: {
                                        aspA: {
                                            value: true,
                                            result: 'fatal',
                                            message: 'Required',
                                        },
                                    },
                                },
                                levelA: {
                                    $r: 'pass',
                                    $a: {},
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
