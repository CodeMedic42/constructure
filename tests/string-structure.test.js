import chai from 'chai';
import Structure from '../src';
import Attribute from '../src/attribute';
import Validator from '../src/validators/validator';

const { expect } = chai;

describe('String Structure', () => {
    it('Null Value', () => {
        const structure = Structure.string();

        return structure.run(null).then((attributeValues) => {
            expect(attributeValues).to.eql({
                $r: null,
                $a: {},
            });
        });
    });

    it('Empty String', () => {
        const structure = Structure.string();

        return structure.run('').then((attributeValues) => {
            expect(attributeValues).to.eql({
                $r: null,
                $a: {},
            });
        });
    });

    it('Basic String', () => {
        const structure = Structure.string();

        return structure.run('test').then((attributeValues) => {
            expect(attributeValues).to.eql({
                $r: null,
                $a: {},
            });
        });
    });

    it('Number', () => {
        const structure = Structure.string();

        expect(() => {
            structure.run(42);
        }).to.throw('Must be a string');
    });

    it('Boolean', () => {
        const structure = Structure.string();

        expect(() => {
            structure.run(true);
        }).to.throw('Must be a string');
    });

    it('Object', () => {
        const structure = Structure.string();

        expect(() => {
            structure.run({});
        }).to.throw('Must be a string');
    });

    it('Array', () => {
        const structure = Structure.string();

        expect(() => {
            structure.run([]);
        }).to.throw('Must be a string');
    });

    it('Basic Required Passed', () => {
        const structure = Structure.string()
            .attributes({
                required: Attribute.required(),
            });

        return structure.run('test').then((attributeValues) => {
            expect(attributeValues).to.eql({
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
            .attributes({
                required: Attribute.required(),
            });

        return structure.run().then((attributeValues) => {
            expect(attributeValues).to.eql({
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
