import chai from 'chai';
import Structure, { Aspect, VerificationError } from '../src';

const { expect } = chai;

describe('Number Structure', () => {
    it('Null Value', () => {
        const structure = Structure.number();

        return structure.run(null).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Zero number', () => {
        const structure = Structure.number();

        return structure.run(0).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Basic number', () => {
        const structure = Structure.number();

        return structure.run(5).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('String', () => {
        const structure = Structure.number();

        return expect(structure.run('test'))
            .to.be.rejectedWith(VerificationError, 'Must be a number')
            .then((error) => {
                expect(error.path).to.eql([]);
            });
    });

    it('Boolean', () => {
        const structure = Structure.number();

        return expect(structure.run(true))
            .to.be.rejectedWith(VerificationError, 'Must be a number')
            .then((error) => {
                expect(error.path).to.eql([]);
            });
    });

    it('Object', () => {
        const structure = Structure.number();

        return expect(structure.run({}))
            .to.be.rejectedWith(VerificationError, 'Must be a number')
            .then((error) => {
                expect(error.path).to.eql([]);
            });
    });

    it('Array', () => {
        const structure = Structure.number();

        return expect(structure.run([]))
            .to.be.rejectedWith(VerificationError, 'Must be a number')
            .then((error) => {
                expect(error.path).to.eql([]);
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
            });
        });
    });
});
