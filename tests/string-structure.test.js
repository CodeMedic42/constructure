import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Structure, { Aspect } from '../src';

chai.use(chaiAsPromised);

const { expect } = chai;

describe('String Structure', () => {
    xit('Null Value', () => {
        const structure = Structure().aspect(Aspect.type('string'));

        // const structure = Structure.string();

        return structure.run(null).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {
                    type: {
                        result: 'fatal',
                        value: 'string',
                        message: 'Must be a string value.',
                    },
                },
            });
        });
    });

    xit('Empty String', () => {
        const structure = Structure().aspect(Aspect.type('string'));

        return structure.run('').then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'pass',
                $a: {
                    type: {
                        result: 'pass',
                        value: 'string',
                        message: null,
                    },
                },
            });
        });
    });

    xit('Basic String', () => {
        const structure = Structure().aspect(Aspect.type('string'));

        return structure.run('test').then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'pass',
                $a: {
                    type: {
                        result: 'pass',
                        value: 'string',
                        message: null,
                    },
                },
            });
        });
    });

    xit('Number', () => {
        const structure = Structure().aspect(Aspect.type('string'));

        return structure.run(42).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {
                    type: {
                        result: 'fatal',
                        value: 'string',
                        message: 'Must be a string value.',
                    },
                },
            });
        });
    });

    xit('Boolean', () => {
        const structure = Structure().aspect(Aspect.type('string'));

        return structure.run(true).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {
                    type: {
                        result: 'fatal',
                        value: 'string',
                        message: 'Must be a string value.',
                    },
                },
            });
        });
    });

    xit('Object', () => {
        const structure = Structure().aspect(Aspect.type('string'));

        return structure.run({}).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {
                    type: {
                        result: 'fatal',
                        value: 'string',
                        message: 'Must be a string value.',
                    },
                },
            });
        });
    });

    xit('Array', () => {
        const structure = Structure().aspect(Aspect.type('string'));

        return structure.run([]).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {
                    type: {
                        result: 'fatal',
                        value: 'string',
                        message: 'Must be a string value.',
                    },
                },
            });
        });
    });

    xit('Basic Required Passed', () => {
        const structure = Structure()
            .aspect(Aspect.type('string'))
            .aspect(Aspect.required());

        return structure.run('test').then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'pass',
                $a: {
                    type: {
                        result: 'pass',
                        value: 'string',
                        message: null,
                    },
                    required: {
                        value: true,
                        result: 'pass',
                        message: null,
                    },
                },
            });
        });
    });

    xit('Basic Required Fails', () => {
        const structure = Structure()
            .aspect(Aspect.type('string'))
            .aspect(Aspect.required());

        return structure.run().then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'fatal',
                $a: {
                    type: {
                        result: 'pass',
                        value: 'string',
                        message: null,
                    },
                    required: {
                        value: true,
                        result: 'fatal',
                        message: 'Required',
                    },
                },
            });
        });
    });

    xit('Basic MinLength Passed', () => {
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

    xit('Basic MinLength Fails', () => {
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

    xit('Basic MaxLength Passed', () => {
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

    xit('Basic MaxLength Fails', () => {
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
