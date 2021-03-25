import chai from 'chai';
import Structure, { Aspect } from '../src';

const { expect } = chai;

xdescribe('Boolean Structure', () => {
    it('Null Value', () => {
        const structure = Structure.boolean();

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

    it('Undefined String', () => {
        const structure = Structure.boolean();

        return structure.run().then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'pass',
                $a: {},
                $v: {
                    $m: null,
                    $r: 'pass',
                },
            });
        });
    });

    it('False Value', () => {
        const structure = Structure.boolean();

        return structure.run(false).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'pass',
                $a: {},
                $v: {
                    $m: null,
                    $r: 'pass',
                },
            });
        });
    });

    it('True Value', () => {
        const structure = Structure.boolean();

        return structure.run(true).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'pass',
                $a: {},
                $v: {
                    $m: null,
                    $r: 'pass',
                },
            });
        });
    });

    it('Number', () => {
        const structure = Structure.boolean();

        return structure.run(42).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {},
                $v: {
                    $m: 'Must be a boolean',
                    $r: 'fatal',
                },
            });
        });
    });

    it('String', () => {
        const structure = Structure.boolean();

        return structure.run('test').then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {},
                $v: {
                    $m: 'Must be a boolean',
                    $r: 'fatal',
                },
            });
        });
    });

    it('Object', () => {
        const structure = Structure.boolean();

        return structure.run({}).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {},
                $v: {
                    $m: 'Must be a boolean',
                    $r: 'fatal',
                },
            });
        });
    });

    it('Array', () => {
        const structure = Structure.boolean();

        return structure.run([]).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {},
                $v: {
                    $m: 'Must be a boolean',
                    $r: 'fatal',
                },
            });
        });
    });

    it('Basic Required Passed', () => {
        const structure = Structure.boolean()
            .aspect(Aspect.required());

        return structure.run(true).then((aspectValues) => {
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
                    $m: null,
                    $r: 'pass',
                },
            });
        });
    });

    it('Basic Required Fails', () => {
        const structure = Structure.boolean()
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
                    $m: null,
                    $r: 'pass',
                },
            });
        });
    });
});
