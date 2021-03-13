import chai from 'chai';
import Structure, { Aspect } from '../src';

const { expect } = chai;

describe('Any Structure', () => {
    it('Null Value', () => {
        const structure = Structure.any();

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
        const structure = Structure.any();

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

    it('String Value', () => {
        const structure = Structure.any();

        return structure.run('test').then((aspectValues) => {
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
        const structure = Structure.any();

        return structure.run(42).then((aspectValues) => {
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

    it('Boolean', () => {
        const structure = Structure.any();

        return structure.run(true).then((aspectValues) => {
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

    it('Object', () => {
        const structure = Structure.any();

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

    it('Array', () => {
        const structure = Structure.any();

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

    it('Basic Required Passed', () => {
        const structure = Structure.any()
            .aspect(Aspect.required());

        return structure.run('test').then((aspectValues) => {
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
        const structure = Structure.any()
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

    it('Basic MinLength Passed', () => {
        const structure = Structure.any()
            .aspect(Aspect.minLength(3));

        return structure.run('test').then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'pass',
                $a: {
                    minLength: {
                        value: 3,
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

    it('Basic MinLength Fails', () => {
        const structure = Structure.any()
            .aspect(Aspect.minLength(8));

        return structure.run('test').then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {
                    minLength: {
                        value: 8,
                        result: 'fatal',
                        message: 'Min Length',
                    },
                },
                $v: {
                    $r: 'pass',
                    $m: null,
                },
            });
        });
    });

    it('Basic MaxLength Passed', () => {
        const structure = Structure.any()
            .aspect(Aspect.maxLength(8));

        return structure.run('test').then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'pass',
                $a: {
                    maxLength: {
                        value: 8,
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

    it('Basic MaxLength Fails', () => {
        const structure = Structure.any()
            .aspect(Aspect.maxLength(3));

        return structure.run('test').then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {
                    maxLength: {
                        value: 3,
                        result: 'fatal',
                        message: 'Max Length',
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
