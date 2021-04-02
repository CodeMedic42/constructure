import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { isNil } from 'lodash';
import Structure, { Aspect } from '../src';

chai.use(chaiAsPromised);

const { expect } = chai;

xdescribe('Structure', () => {
    describe('Basic Structure', () => {
        const structure = Structure();

        const basicStructureTest = (testValue, data) => {
            return structure.run(testValue).then((result) => {
                const expected = {
                    $r: 'pass',
                    $a: {},
                };

                if (!isNil(data)) {
                    expected.$d = data;
                }

                expect(result.toJS()).to.eql(expected);
            });
        };

        it('undefined', () => {
            return basicStructureTest();
        });

        it('null', () => {
            return basicStructureTest(null);
        });

        it('string', () => {
            return basicStructureTest('test');
        });

        it('number', () => {
            return basicStructureTest(42);
        });

        it('true', () => {
            return basicStructureTest(true);
        });

        it('false', () => {
            return basicStructureTest(false);
        });

        it('object', () => {
            return basicStructureTest({}, {});
        });

        it('array', () => {
            return basicStructureTest([], []);
        });
    });

    describe('Structure with Aspect', () => {
        describe('Aspect', () => {
            const structure = Structure()
                .aspect(Aspect('aspectId', 'aspectValue'));

            const basicAspectTest = (testValue, data) => {
                return structure.run(testValue).then((result) => {
                    const expected = {
                        $r: 'pass',
                        $a: {
                            aspectId: {
                                value: 'aspectValue',
                                result: 'pass',
                                message: null,
                            },
                        },
                    };

                    if (!isNil(data)) {
                        expected.$d = data;
                    }

                    expect(result.toJS()).to.eql(expected);
                });
            };

            it('undefined', () => {
                return basicAspectTest();
            });

            it('null', () => {
                return basicAspectTest(null);
            });

            it('string', () => {
                return basicAspectTest('test');
            });

            it('number', () => {
                return basicAspectTest(42);
            });

            it('true', () => {
                return basicAspectTest(true);
            });

            it('false', () => {
                return basicAspectTest(false);
            });

            it('object', () => {
                return basicAspectTest({}, {});
            });

            it('array', () => {
                return basicAspectTest([], []);
            });
        });

        describe('Aspect With Basic Validator', () => {
            describe('Validator Passes', () => {
                const structure = Structure()
                    .aspect(Aspect('aspectId', 'aspectValue', {
                        validator: () => null,
                    }));

                const basicValidatorPassTest = (testValue, data) => {
                    return structure.run(testValue).then((result) => {
                        const expected = {
                            $r: 'pass',
                            $a: {
                                aspectId: {
                                    value: 'aspectValue',
                                    result: 'pass',
                                    message: null,
                                },
                            },
                        };

                        if (!isNil(data)) {
                            expected.$d = data;
                        }

                        expect(result.toJS()).to.eql(expected);
                    });
                };

                it('undefined', () => {
                    return basicValidatorPassTest();
                });

                it('null', () => {
                    return basicValidatorPassTest(null);
                });

                it('string', () => {
                    return basicValidatorPassTest('test');
                });

                it('number', () => {
                    return basicValidatorPassTest(42);
                });

                it('true', () => {
                    return basicValidatorPassTest(true);
                });

                it('false', () => {
                    return basicValidatorPassTest(false);
                });

                it('object', () => {
                    return basicValidatorPassTest({}, {});
                });

                it('array', () => {
                    return basicValidatorPassTest([], []);
                });
            });

            describe('Validator Fails', () => {
                const structure = Structure()
                    .aspect(Aspect('aspectId', 'aspectValue', {
                        validator: () => 'Fail Message',
                    }));

                const basicValidatorFailTest = (testValue, data) => {
                    return structure.run(testValue).then((result) => {
                        const expected = {
                            $r: 'fatal',
                            $a: {
                                aspectId: {
                                    value: 'aspectValue',
                                    result: 'fatal',
                                    message: 'Fail Message',
                                },
                            },
                        };

                        if (!isNil(data)) {
                            expected.$d = data;
                        }

                        expect(result.toJS()).to.eql(expected);
                    });
                };

                it('undefined', () => {
                    return basicValidatorFailTest();
                });

                it('null', () => {
                    return basicValidatorFailTest(null);
                });

                it('string', () => {
                    return basicValidatorFailTest('test');
                });

                it('number', () => {
                    return basicValidatorFailTest(42);
                });

                it('true', () => {
                    return basicValidatorFailTest(true);
                });

                it('false', () => {
                    return basicValidatorFailTest(false);
                });

                it('object', () => {
                    return basicValidatorFailTest({}, {});
                });

                it('array', () => {
                    return basicValidatorFailTest([], []);
                });
            });
        });

        describe('Aspect With Non-Fatal Validator', () => {
            describe('Validator Passes', () => {
                const structure = Structure()
                    .aspect(Aspect('aspectId', 'aspectValue', {
                        validator: {
                            onValidate: () => null,
                            fatal: false,
                        },
                    }));

                const basicValidatorPassTest = (testValue, data) => {
                    return structure.run(testValue).then((result) => {
                        const expected = {
                            $r: 'pass',
                            $a: {
                                aspectId: {
                                    value: 'aspectValue',
                                    result: 'pass',
                                    message: null,
                                },
                            },
                        };

                        if (!isNil(data)) {
                            expected.$d = data;
                        }

                        expect(result.toJS()).to.eql(expected);
                    });
                };

                it('undefined', () => {
                    return basicValidatorPassTest();
                });

                it('null', () => {
                    return basicValidatorPassTest(null);
                });

                it('string', () => {
                    return basicValidatorPassTest('test');
                });

                it('number', () => {
                    return basicValidatorPassTest(42);
                });

                it('true', () => {
                    return basicValidatorPassTest(true);
                });

                it('false', () => {
                    return basicValidatorPassTest(false);
                });

                it('object', () => {
                    return basicValidatorPassTest({}, {});
                });

                it('array', () => {
                    return basicValidatorPassTest([], []);
                });
            });

            describe('Validator Fails', () => {
                const structure = Structure()
                    .aspect(Aspect('aspectId', 'aspectValue', {
                        validator: {
                            onValidate: () => 'Fail Message',
                            fatal: false,
                        },
                    }));

                const basicValidatorFailTest = (testValue, data) => {
                    return structure.run(testValue).then((result) => {
                        const expected = {
                            $r: 'non-fatal',
                            $a: {
                                aspectId: {
                                    value: 'aspectValue',
                                    result: 'non-fatal',
                                    message: 'Fail Message',
                                },
                            },
                        };

                        if (!isNil(data)) {
                            expected.$d = data;
                        }

                        expect(result.toJS()).to.eql(expected);
                    });
                };

                it('undefined', () => {
                    return basicValidatorFailTest();
                });

                it('null', () => {
                    return basicValidatorFailTest(null);
                });

                it('string', () => {
                    return basicValidatorFailTest('test');
                });

                it('number', () => {
                    return basicValidatorFailTest(42);
                });

                it('true', () => {
                    return basicValidatorFailTest(true);
                });

                it('false', () => {
                    return basicValidatorFailTest(false);
                });

                it('object', () => {
                    return basicValidatorFailTest({}, {});
                });

                it('array', () => {
                    return basicValidatorFailTest([], []);
                });
            });
        });
    });

    describe('Keyed Structure', () => {
        const structure = Structure().keyed({
            properties: {
                foo: Structure(),
            },
        });

        const keyedStructureTest = (testValue, data) => {
            return structure.run(testValue).then((result) => {
                const expected = {
                    $r: 'pass',
                    $a: {},
                };

                if (!isNil(data)) {
                    expected.$d = data;
                }

                expect(result.toJS()).to.eql(expected);
            });
        };

        it('undefined', () => {
            return keyedStructureTest();
        });

        it('null', () => {
            return keyedStructureTest(null);
        });

        it('string', () => {
            return keyedStructureTest('test');
        });

        it('number', () => {
            return keyedStructureTest(42);
        });

        it('true', () => {
            return keyedStructureTest(true);
        });

        it('false', () => {
            return keyedStructureTest(false);
        });

        it('object', () => {
            return keyedStructureTest({}, {
                foo: {
                    $r: 'pass',
                    $a: {},
                },
            });
        });

        it('array', () => {
            return keyedStructureTest([], []);
        });
    });
});
