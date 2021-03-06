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
});
