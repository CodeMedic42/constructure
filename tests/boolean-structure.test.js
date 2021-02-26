import chai from 'chai';
import Structure, { Aspect, VerificationError } from '../src';

const { expect } = chai;

describe('Boolean Structure', () => {
    it('Null Value', () => {
        const structure = Structure.boolean();

        return structure.run(null).then((aspectValues) => {
            expect(aspectValues).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Undefined String', () => {
        const structure = Structure.boolean();

        return structure.run().then((aspectValues) => {
            expect(aspectValues).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('False Value', () => {
        const structure = Structure.boolean();

        return structure.run(false).then((aspectValues) => {
            expect(aspectValues).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('True Value', () => {
        const structure = Structure.boolean();

        return structure.run(true).then((aspectValues) => {
            expect(aspectValues).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Number', () => {
        const structure = Structure.boolean();

        return expect(structure.run(42))
            .to.be.rejectedWith(VerificationError, 'Must be a boolean')
            .then((error) => {
                expect(error.path).to.eql([]);
            });
    });

    it('String', () => {
        const structure = Structure.boolean();

        return expect(structure.run('test'))
            .to.be.rejectedWith(VerificationError, 'Must be a boolean')
            .then((error) => {
                expect(error.path).to.eql([]);
            });
    });

    it('Object', () => {
        const structure = Structure.boolean();

        return expect(structure.run({}))
            .to.be.rejectedWith(VerificationError, 'Must be a boolean')
            .then((error) => {
                expect(error.path).to.eql([]);
            });
    });

    it('Array', () => {
        const structure = Structure.boolean();

        return expect(structure.run([]))
            .to.be.rejectedWith(VerificationError, 'Must be a boolean')
            .then((error) => {
                expect(error.path).to.eql([]);
            });
    });

    it('Basic Required Passed', () => {
        const structure = Structure.boolean()
            .aspect('required', Aspect.required());

        return structure.run(true).then((aspectValues) => {
            expect(aspectValues).to.eql({
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
        const structure = Structure.boolean()
            .aspect('required', Aspect.required());

        return structure.run().then((aspectValues) => {
            expect(aspectValues).to.eql({
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
