import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Structure, { Aspect, VerificationError } from '../src';

chai.use(chaiAsPromised);

const { expect } = chai;

xdescribe('String Structure', () => {
    it('Null Value', () => {
        const structure = Structure.string();

        return structure.run(null).then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Empty String', () => {
        const structure = Structure.string();

        return structure.run('').then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Basic String', () => {
        const structure = Structure.string();

        return structure.run('test').then((aspectValues) => {
            expect(aspectValues.toJS()).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Number', () => {
        const structure = Structure.string();

        return expect(structure.run(42))
            .to.be.rejectedWith(VerificationError, 'Must be a string')
            .then((error) => {
                expect(error.path).to.eql([]);
            });
    });

    it('Boolean', () => {
        const structure = Structure.string();

        return expect(structure.run(true))
            .to.be.rejectedWith(VerificationError, 'Must be a string')
            .then((error) => {
                expect(error.path).to.eql([]);
            });
    });

    it('Object', () => {
        const structure = Structure.string();

        return expect(structure.run({}))
            .to.be.rejectedWith(VerificationError, 'Must be a string')
            .then((error) => {
                expect(error.path).to.eql([]);
            });
    });

    it('Array', () => {
        const structure = Structure.string();

        return expect(structure.run([]))
            .to.be.rejectedWith(VerificationError, 'Must be a string')
            .then((error) => {
                expect(error.path).to.eql([]);
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
            });
        });
    });
});
