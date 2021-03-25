import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Structure, { Aspect } from '../src';

chai.use(chaiAsPromised);

const { expect } = chai;

xdescribe('String Structure', () => {
    it('Null Value', () => {
        const structure = Structure.string();

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

    it('Empty String', () => {
        const structure = Structure.string();

        return structure.run('').then((aspectValues) => {
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

    it('Basic String', () => {
        const structure = Structure.string();

        return structure.run('test').then((aspectValues) => {
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
        const structure = Structure.string();

        return structure.run(42).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {},
                $v: {
                    $m: 'Must be a string',
                    $r: 'fatal',
                },
            });
        });
    });

    it('Boolean', () => {
        const structure = Structure.string();

        return structure.run(true).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {},
                $v: {
                    $m: 'Must be a string',
                    $r: 'fatal',
                },
            });
        });
    });

    it('Object', () => {
        const structure = Structure.string();

        return structure.run({}).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {},
                $v: {
                    $m: 'Must be a string',
                    $r: 'fatal',
                },
            });
        });
    });

    it('Array', () => {
        const structure = Structure.string();

        return structure.run([]).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {},
                $v: {
                    $m: 'Must be a string',
                    $r: 'fatal',
                },
            });
        });
    });

    it('Basic Required Passed', () => {
        const structure = Structure.string()
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
                    $m: null,
                    $r: 'pass',
                },
            });
        });
    });

    it('Basic Required Fails', () => {
        const structure = Structure.string()
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

    it('Basic MinLength Passed', () => {
        const structure = Structure.string()
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
                    $m: null,
                    $r: 'pass',
                },
            });
        });
    });

    it('Basic MinLength Fails', () => {
        const structure = Structure.string()
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
                    $m: null,
                    $r: 'pass',
                },
            });
        });
    });

    it('Basic MaxLength Passed', () => {
        const structure = Structure.string()
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
                    $m: null,
                    $r: 'pass',
                },
            });
        });
    });

    it('Basic MaxLength Fails', () => {
        const structure = Structure.string()
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
                    $m: null,
                    $r: 'pass',
                },
            });
        });
    });
});
