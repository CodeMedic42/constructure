import chai from 'chai';
import Structure, { Aspect, VerificationError } from '../src';

const { expect } = chai;

xdescribe('Object Structure', () => {
    xdescribe('Value Verification', () => {
        it('Null Value', () => {
            const structure = Structure.object();

            return structure.run(null).then((aspectValues) => {
                expect(aspectValues.toJS()).to.eql({
                    $r: 'pass',
                    $a: {},
                });
            });
        });

        it('Undefined Value', () => {
            const structure = Structure.object();

            return structure.run().then((aspectValues) => {
                expect(aspectValues.toJS()).to.eql({
                    $r: 'pass',
                    $a: {},
                });
            });
        });

        it('Object Value', () => {
            const structure = Structure.object();

            return structure.run({}).then((aspectValues) => {
                expect(aspectValues.toJS()).to.eql({
                    $r: 'pass',
                    $a: {},
                });
            });
        });

        it('Number Value', () => {
            const structure = Structure.object();

            return expect(structure.run(42))
                .to.be.rejectedWith(VerificationError, 'Must be an object')
                .then((error) => {
                    expect(error.path).to.eql([]);
                });
        });

        it('String Value', () => {
            const structure = Structure.object();

            return expect(structure.run('test'))
                .to.be.rejectedWith(VerificationError, 'Must be an object')
                .then((error) => {
                    expect(error.path).to.eql([]);
                });
        });

        it('Boolean Value', () => {
            const structure = Structure.object();

            return expect(structure.run(true))
                .to.be.rejectedWith(VerificationError, 'Must be an object')
                .then((error) => {
                    expect(error.path).to.eql([]);
                });
        });

        it('Array Value', () => {
            const structure = Structure.object();

            return expect(structure.run([]))
                .to.be.rejectedWith(VerificationError, 'Must be an object')
                .then((error) => {
                    expect(error.path).to.eql([]);
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
                        $d: {
                            property1: {
                                $r: 'pass',
                                $a: {},
                            },
                            property2: {
                                $r: 'pass',
                                $a: {},
                            },
                            property3: {
                                $r: 'pass',
                                $a: {},
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

                return expect(structure.run(value))
                    .to.be.rejectedWith(VerificationError, 'Must be a string')
                    .then((error) => {
                        expect(error.path).to.eql(['property2']);
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
                        $d: {
                            property1: {
                                $r: 'pass',
                                $a: {},
                            },
                            property2: {
                                $r: 'pass',
                                $a: {},
                            },
                            property3: {
                                $r: 'pass',
                                $a: {},
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

                return expect(structure.run(value))
                    .to.be.rejectedWith(VerificationError, 'Must be a number')
                    .then((error) => {
                        expect(error.path).to.eql(['property2']);
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
                        $d: {
                            property1: {
                                $r: 'pass',
                                $a: {},
                            },
                            property2: {
                                $r: 'pass',
                                $a: {},
                            },
                            property3: {
                                $r: 'pass',
                                $a: {},
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
                        $d: {
                            property1: {
                                $r: 'pass',
                                $a: {},
                            },
                            property2: {
                                $r: 'pass',
                                $a: {},
                            },
                            property3: {
                                $r: 'pass',
                                $a: {},
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

                return expect(structure.run(value))
                    .to.be.rejectedWith(VerificationError, 'Must be an array')
                    .then((error) => {
                        expect(error.path).to.eql(['property2']);
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
                        $d: {
                            property1: {
                                $r: 'pass',
                                $a: {},
                            },
                            property2: {
                                $r: 'pass',
                                $a: {},
                            },
                            property3: {
                                $r: 'pass',
                                $a: {},
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
                        $d: {
                            property1: {
                                $r: 'pass',
                                $a: {},
                            },
                            property2: {
                                $r: 'pass',
                                $a: {},
                            },
                            property3: {
                                $r: 'pass',
                                $a: {},
                            },
                            property4: {
                                $r: 'pass',
                                $a: {},
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
                        $d: {
                            property1: {
                                $r: 'pass',
                                $a: {},
                            },
                            property2: {
                                $r: 'pass',
                                $a: {},
                            },
                            property3: {
                                $r: 'pass',
                                $a: {},
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

                return expect(structure.run(value))
                    .to.be.rejectedWith(VerificationError, 'Must be an object')
                    .then((error) => {
                        expect(error.path).to.eql(['property3']);
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

                return expect(structure.run(value))
                    .to.be.rejectedWith(VerificationError, 'Must be a boolean')
                    .then((error) => {
                        expect(error.path).to.eql(['property4']);
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

                return expect(structure.run(value))
                    .to.be.rejectedWith(VerificationError, 'The property property4 is invalid')
                    .then((error) => {
                        expect(error.path).to.eql([]);
                    });
            });
        });
    });
});
