import chai from 'chai';
import Structure, { Aspect, VerificationError } from '../src';

const { expect } = chai;

describe('Array Structure', () => {
    it('Null Value', () => {
        const structure = Structure.array();

        return structure.run(null).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Undefined Value', () => {
        const structure = Structure.array();

        return structure.run().then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Array Value', () => {
        const structure = Structure.array();

        return structure.run([]).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Number Value', () => {
        const structure = Structure.array();

        return expect(structure.run(42))
            .to.be.rejectedWith(VerificationError, 'Must be an array')
            .then((error) => {
                expect(error.path).to.eql([]);
            });
    });

    it('String Value', () => {
        const structure = Structure.array();

        return expect(structure.run('test'))
            .to.be.rejectedWith(VerificationError, 'Must be an array')
            .then((error) => {
                expect(error.path).to.eql([]);
            });
    });

    it('Boolean Value', () => {
        const structure = Structure.array();

        return expect(structure.run(true))
            .to.be.rejectedWith(VerificationError, 'Must be an array')
            .then((error) => {
                expect(error.path).to.eql([]);
            });
    });

    it('Object Value', () => {
        const structure = Structure.array();

        return expect(structure.run({}))
            .to.be.rejectedWith(VerificationError, 'Must be an array')
            .then((error) => {
                expect(error.path).to.eql([]);
            });
    });

    it('Basic Required Passed', () => {
        const structure = Structure.array()
            .aspect(Aspect.required());

        return structure.run([]).then((aspectValues) => {
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
        const structure = Structure.array()
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

    it('Is unique within pass', () => {
        const structure = Structure.object({
            array: Structure.array(
                Structure.object({
                    id: Structure.string()
                        .aspect(Aspect.unique('$parent.$parent:idKey')),
                }),
            ).aspect(Aspect.register('idKey')),
        });

        const value = {
            array: [{
                id: 'foo',
            }, {
                id: 'bar',
            }, {
                id: 'faz',
            }, {
                id: 'baz',
            }],
        };

        return structure.run(value).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'pass',
                $a: {},
                $d: {
                    array: {
                        $r: 'pass',
                        $a: {
                            idKey: {
                                result: 'pass',
                                value: {
                                    foo: true,
                                    bar: true,
                                    faz: true,
                                    baz: true,
                                },
                                message: null,
                            },
                        },
                        $d: [
                            {
                                $r: 'pass',
                                $a: {},
                                $d: {
                                    id: {
                                        $r: 'pass',
                                        $a: {
                                            unique: {
                                                result: 'pass',
                                                value: true,
                                                message: null,
                                            },
                                        },
                                    },
                                },
                            },
                            {
                                $r: 'pass',
                                $a: {},
                                $d: {
                                    id: {
                                        $r: 'pass',
                                        $a: {
                                            unique: {
                                                result: 'pass',
                                                value: true,
                                                message: null,
                                            },
                                        },
                                    },
                                },
                            },
                            {
                                $r: 'pass',
                                $a: {},
                                $d: {
                                    id: {
                                        $r: 'pass',
                                        $a: {
                                            unique: {
                                                result: 'pass',
                                                value: true,
                                                message: null,
                                            },
                                        },
                                    },
                                },
                            },
                            {
                                $r: 'pass',
                                $a: {},
                                $d: {
                                    id: {
                                        $r: 'pass',
                                        $a: {
                                            unique: {
                                                result: 'pass',
                                                value: true,
                                                message: null,
                                            },
                                        },
                                    },
                                },
                            },
                        ],
                    },
                },
            });
        });
    });

    it('Is unique within fail', () => {
        const structure = Structure.object({
            array: Structure.array(
                Structure.object({
                    id: Structure.string()
                        .aspect(Aspect.unique('$parent.$parent:idKey')),
                }),
            ).aspect(Aspect.register('idKey')),
        });

        const value = {
            array: [{
                id: 'foo',
            }, {
                id: 'bar',
            }, {
                id: 'foo',
            }, {
                id: 'baz',
            }],
        };

        return structure.run(value).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {},
                $d: {
                    array: {
                        $r: 'fatal',
                        $a: {
                            idKey: {
                                result: 'pass',
                                value: {
                                    foo: true,
                                    bar: true,
                                    baz: true,
                                },
                                message: null,
                            },
                        },
                        $d: [
                            {
                                $r: 'pass',
                                $a: {},
                                $d: {
                                    id: {
                                        $r: 'pass',
                                        $a: {
                                            unique: {
                                                result: 'pass',
                                                value: true,
                                                message: null,
                                            },
                                        },
                                    },
                                },
                            },
                            {
                                $r: 'pass',
                                $a: {},
                                $d: {
                                    id: {
                                        $r: 'pass',
                                        $a: {
                                            unique: {
                                                result: 'pass',
                                                value: true,
                                                message: null,
                                            },
                                        },
                                    },
                                },
                            },
                            {
                                $r: 'fatal',
                                $a: {},
                                $d: {
                                    id: {
                                        $r: 'fatal',
                                        $a: {
                                            unique: {
                                                result: 'fatal',
                                                value: true,
                                                message: 'Unique',
                                            },
                                        },
                                    },
                                },
                            },
                            {
                                $r: 'pass',
                                $a: {},
                                $d: {
                                    id: {
                                        $r: 'pass',
                                        $a: {
                                            unique: {
                                                result: 'pass',
                                                value: true,
                                                message: null,
                                            },
                                        },
                                    },
                                },
                            },
                        ],
                    },
                },
            });
        });
    });
});
