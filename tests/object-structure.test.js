import chai from 'chai';
import Structure, { Aspect, VerificationError } from '../src';

const { expect } = chai;

describe('Object Structure', () => {
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
