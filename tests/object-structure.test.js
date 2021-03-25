import chai from 'chai';
import Structure, { Aspect } from '../src';

const { expect } = chai;

xdescribe('Object Structure', () => {
    xdescribe('Value Verification', () => {
        it('Null Value', () => {
            const structure = Structure.object();

            return structure.run(null).then((aspectValues) => {
                expect(aspectValues.toJS()).to.eql({
                    $r: 'fatal',
                    $a: {},
                    $v: {
                        $r: 'fatal',
                        $m: 'Null is not allowed',
                    },
                });
            });
        });

        it('Undefined Value', () => {
            const structure = Structure.object();

            return structure.run().then((aspectValues) => {
                expect(aspectValues.toJS()).to.eql({
                    $r: 'pass',
                    $a: {},
                    $v: {
                        $r: 'pass',
                        $m: null,
                    },
                });
            });
        });

        it('Object Value', () => {
            const structure = Structure.object();

            return structure.run({}).then((aspectValues) => {
                expect(aspectValues.toJS()).to.eql({
                    $r: 'pass',
                    $a: {},
                    $v: {
                        $r: 'pass',
                        $m: null,
                    },
                });
            });
        });

        it('Number Value', () => {
            const structure = Structure.object();

            return structure.run(42).then((aspectValues) => {
                expect(aspectValues.toJS()).to.eql({
                    $r: 'fatal',
                    $a: {},
                    $v: {
                        $r: 'fatal',
                        $m: 'Must be an object',
                    },
                });
            });
        });

        it('String Value', () => {
            const structure = Structure.object();

            return structure.run('test').then((aspectValues) => {
                expect(aspectValues.toJS()).to.eql({
                    $r: 'fatal',
                    $a: {},
                    $v: {
                        $r: 'fatal',
                        $m: 'Must be an object',
                    },
                });
            });
        });

        it('Boolean Value', () => {
            const structure = Structure.object();

            return structure.run(true).then((aspectValues) => {
                expect(aspectValues.toJS()).to.eql({
                    $r: 'fatal',
                    $a: {},
                    $v: {
                        $r: 'fatal',
                        $m: 'Must be an object',
                    },
                });
            });
        });

        it('Array Value', () => {
            const structure = Structure.object();

            return structure.run([]).then((aspectValues) => {
                expect(aspectValues.toJS()).to.eql({
                    $r: 'fatal',
                    $a: {},
                    $v: {
                        $r: 'fatal',
                        $m: 'Must be an object',
                    },
                });
            });
        });

        it('Basic Required Passed', () => {
            const structure = Structure.object()
                .aspect(Aspect.required());

            return structure.run({}).then((aspectValues) => {
                expect(aspectValues.toJS()).to.eql({
                    $r: 'pass',
                    $a: {
                        required: {
                            value: true,
                            result: 'pass',
                            message: null,
                        },
                    },
                    $v: {
                        $r: 'pass',
                        $m: null,
                    },
                });
            });
        });

        it('Basic Required Fails', () => {
            const structure = Structure.object()
                .aspect(Aspect.required());

            return structure.run().then((aspectValues) => {
                expect(aspectValues.toJS()).to.eql({
                    $r: 'fatal',
                    $a: {
                        required: {
                            value: true,
                            result: 'fatal',
                            message: 'Required',
                        },
                    },
                    $v: {
                        $r: 'pass',
                        $m: null,
                    },
                });
            });
        });
    });

    xdescribe('Single Structure Verification', () => {
        xdescribe('String Structure', () => {
            it('Pass Verification', () => {
                const structure = Structure.object(Structure.string());

                const value = {
                    property1: 'test1',
                    property2: 'test2',
                    property3: 'test3',
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
                            property1: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                            },
                            property2: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                            },
                            property3: {
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

            it('Fail Verification', () => {
                const structure = Structure.object(Structure.string());

                const value = {
                    property1: 'test1',
                    property2: 42,
                    property3: 'test3',
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
                            property1: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                            },
                            property2: {
                                $r: 'fatal',
                                $a: {},
                                $v: {
                                    $r: 'fatal',
                                    $m: 'Must be a string',
                                },
                            },
                            property3: {
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
        });

        xdescribe('Number Structure', () => {
            it('Pass Verification', () => {
                const structure = Structure.object(Structure.number());

                const value = {
                    property1: 2,
                    property2: 3,
                    property3: 7,
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
                            property1: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                            },
                            property2: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                            },
                            property3: {
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

            it('Fail Verification', () => {
                const structure = Structure.object(Structure.number());

                const value = {
                    property1: 2,
                    property2: 'test',
                    property3: 7,
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
                            property1: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                            },
                            property2: {
                                $r: 'fatal',
                                $a: {},
                                $v: {
                                    $r: 'fatal',
                                    $m: 'Must be a real number',
                                },
                            },
                            property3: {
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
        });

        xdescribe('Any Structure', () => {
            it('Pass Verification', () => {
                const structure = Structure.object(Structure.any());

                const value = {
                    property1: 2,
                    property2: 'test',
                    property3: false,
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
                            property1: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                            },
                            property2: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                            },
                            property3: {
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
        });

        xdescribe('Array Structure', () => {
            it('Pass Verification', () => {
                const structure = Structure.object(Structure.array());

                const value = {
                    property1: [],
                    property2: [],
                    property3: [],
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
                            property1: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                            },
                            property2: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                            },
                            property3: {
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

            it('Fail Verification', () => {
                const structure = Structure.object(Structure.array());

                const value = {
                    property1: [],
                    property2: {},
                    property3: [],
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
                            property1: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                            },
                            property2: {
                                $r: 'fatal',
                                $a: {},
                                $v: {
                                    $r: 'fatal',
                                    $m: 'Must be an array',
                                },
                            },
                            property3: {
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
        });
    });

    xdescribe('Shaped Structure Verification', () => {
        xdescribe('String Structure', () => {
            it('Pass Verification', () => {
                const structure = Structure.object({
                    property1: Structure.string(),
                    property2: Structure.number(),
                    property3: Structure.object(),
                });

                const value = {
                    property1: 'test1',
                    property2: 42,
                    property3: {},
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
                            property1: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                            },
                            property2: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                            },
                            property3: {
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

            it('Pass Verification with rest', () => {
                const structure = Structure.object({
                    property1: Structure.string(),
                    property2: Structure.number(),
                    property3: Structure.object(),
                }, Structure.boolean());

                const value = {
                    property1: 'test1',
                    property2: 42,
                    property3: {},
                    property4: false,
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
                            property1: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                            },
                            property2: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                            },
                            property3: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                            },
                            property4: {
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

            it('Pass Verification with exact', () => {
                const structure = Structure.object({
                    property1: Structure.string(),
                    property2: Structure.number(),
                    property3: Structure.object(),
                }, true);

                const value = {
                    property1: 'test1',
                    property2: 42,
                    property3: {},
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
                            property1: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                            },
                            property2: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                            },
                            property3: {
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

            it('Fail Verification', () => {
                const structure = Structure.object({
                    property1: Structure.string(),
                    property2: Structure.number(),
                    property3: Structure.object(),
                });

                const value = {
                    property1: 'test1',
                    property2: 42,
                    property3: [],
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
                            property1: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                            },
                            property2: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                            },
                            property3: {
                                $r: 'fatal',
                                $a: {},
                                $v: {
                                    $r: 'fatal',
                                    $m: 'Must be an object',
                                },
                            },
                        },
                    });
                });
            });

            it('Fail Verification with rest', () => {
                const structure = Structure.object({
                    property1: Structure.string(),
                    property2: Structure.number(),
                    property3: Structure.object(),
                }, Structure.boolean());

                const value = {
                    property1: 'test1',
                    property2: 42,
                    property3: {},
                    property4: 'test4',
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
                            property1: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                            },
                            property2: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                            },
                            property3: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                            },
                            property4: {
                                $r: 'fatal',
                                $a: {},
                                $v: {
                                    $r: 'fatal',
                                    $m: 'Must be a boolean',
                                },
                            },
                        },
                    });
                });
            });

            it('Fail Verification with exact', () => {
                const structure = Structure.object({
                    property1: Structure.string(),
                    property2: Structure.number(),
                    property3: Structure.object(),
                }, true);

                const value = {
                    property1: 'test1',
                    property2: 42,
                    property3: {},
                    property4: true,
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
                            property1: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                            },
                            property2: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                            },
                            property3: {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
                            },
                            property4: {
                                $r: 'fatal',
                                $a: {},
                                $v: {
                                    $r: 'fatal',
                                    $m: 'The property property4 is invalid',
                                },
                            },
                        },
                    });
                });
            });
        });
    });
});
