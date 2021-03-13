import chai from 'chai';
import Structure, { Aspect } from '../src';

const { expect } = chai;

describe('Array Structure', () => {
    it('Null Value', () => {
        const structure = Structure.array();

        return structure.run(null).then((aspectValues) => {
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

    it('Undefined Value', () => {
        const structure = Structure.array();

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

    it('Array Value', () => {
        const structure = Structure.array();

        return structure.run([]).then((aspectValues) => {
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
        const structure = Structure.array();

        return structure.run(42).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {},
                $v: {
                    $m: 'Must be an array',
                    $r: 'fatal',
                },
            });
        });
    });

    it('String Value', () => {
        const structure = Structure.array();

        return structure.run('test').then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {},
                $v: {
                    $m: 'Must be an array',
                    $r: 'fatal',
                },
            });
        });
    });

    it('Boolean Value', () => {
        const structure = Structure.array();

        return structure.run(true).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {},
                $v: {
                    $m: 'Must be an array',
                    $r: 'fatal',
                },
            });
        });
    });

    it('Object Value', () => {
        const structure = Structure.array();

        return structure.run({}).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {},
                $v: {
                    $m: 'Must be an array',
                    $r: 'fatal',
                },
            });
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
                $v: {
                    $r: 'pass',
                    $m: null,
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
                $v: {
                    $r: 'pass',
                    $m: null,
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
                $v: {
                    $r: 'pass',
                    $m: null,
                },
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
                        $v: {
                            $r: 'pass',
                            $m: null,
                        },
                        $d: [
                            {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
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
                                        $v: {
                                            $r: 'pass',
                                            $m: null,
                                        },
                                    },
                                },
                            },
                            {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
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
                                        $v: {
                                            $r: 'pass',
                                            $m: null,
                                        },
                                    },
                                },
                            },
                            {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
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
                                        $v: {
                                            $r: 'pass',
                                            $m: null,
                                        },
                                    },
                                },
                            },
                            {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
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
                                        $v: {
                                            $r: 'pass',
                                            $m: null,
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
                $v: {
                    $r: 'pass',
                    $m: null,
                },
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
                        $v: {
                            $r: 'pass',
                            $m: null,
                        },
                        $d: [
                            {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
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
                                        $v: {
                                            $r: 'pass',
                                            $m: null,
                                        },
                                    },
                                },
                            },
                            {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
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
                                        $v: {
                                            $r: 'pass',
                                            $m: null,
                                        },
                                    },
                                },
                            },
                            {
                                $r: 'fatal',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
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
                                        $v: {
                                            $r: 'pass',
                                            $m: null,
                                        },
                                    },
                                },
                            },
                            {
                                $r: 'pass',
                                $a: {},
                                $v: {
                                    $r: 'pass',
                                    $m: null,
                                },
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
                                        $v: {
                                            $r: 'pass',
                                            $m: null,
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
