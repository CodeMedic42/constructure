import chai from 'chai';
import Structure, { Aspect } from '../src';

const { expect } = chai;

xdescribe('Number Structure', () => {
    it('Null Value', () => {
        const structure = Structure.number();

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

    it('Zero number', () => {
        const structure = Structure.number();

        return structure.run(0).then((aspectValues) => {
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

    it('Basic number', () => {
        const structure = Structure.number();

        return structure.run(5).then((aspectValues) => {
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

    it('String', () => {
        const structure = Structure.number();

        return structure.run('test').then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {},
                $v: {
                    $m: 'Must be a real number',
                    $r: 'fatal',
                },
            });
        });
    });

    it('Boolean', () => {
        const structure = Structure.number();

        return structure.run(true).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {},
                $v: {
                    $m: 'Must be a real number',
                    $r: 'fatal',
                },
            });
        });
    });

    it('Object', () => {
        const structure = Structure.number();

        return structure.run({}).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {},
                $v: {
                    $m: 'Must be a real number',
                    $r: 'fatal',
                },
            });
        });
    });

    it('Array', () => {
        const structure = Structure.number();

        return structure.run([]).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {},
                $v: {
                    $m: 'Must be a real number',
                    $r: 'fatal',
                },
            });
        });
    });

    it('Basic Required Passed', () => {
        const structure = Structure.number()
            .aspect(Aspect.required());

        return structure.run(5).then((aspectValues) => {
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
        const structure = Structure.number()
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

    it('Basic Min Passed', () => {
        const structure = Structure.number()
            .aspect(Aspect.min(3));

        return structure.run(5).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'pass',
                $a: {
                    min: {
                        value: 3,
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

    it('Basic Min Fails', () => {
        const structure = Structure.number()
            .aspect(Aspect.min(8));

        return structure.run(5).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {
                    min: {
                        value: 8,
                        result: 'fatal',
                        message: 'Min',
                    },
                },
                $v: {
                    $m: null,
                    $r: 'pass',
                },
            });
        });
    });

    it('Basic Max Passed', () => {
        const structure = Structure.number()
            .aspect(Aspect.max(8));

        return structure.run(5).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'pass',
                $a: {
                    max: {
                        value: 8,
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

    it('Basic Max Fails', () => {
        const structure = Structure.number()
            .aspect(Aspect.max(3));

        return structure.run(5).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {
                    max: {
                        value: 3,
                        result: 'fatal',
                        message: 'Max',
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
