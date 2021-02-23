import chai from 'chai';
import Structure, { Attribute } from '../src';

const { expect } = chai;

describe('Boolean Structure', () => {
    it('Null Value', () => {
        const structure = Structure.boolean();

        return structure.run(null).then((attributeValues) => {
            expect(attributeValues).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Undefined String', () => {
        const structure = Structure.boolean();

        return structure.run().then((attributeValues) => {
            expect(attributeValues).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('False Value', () => {
        const structure = Structure.boolean();

        return structure.run(false).then((attributeValues) => {
            expect(attributeValues).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('True Value', () => {
        const structure = Structure.boolean();

        return structure.run(true).then((attributeValues) => {
            expect(attributeValues).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Number', () => {
        const structure = Structure.boolean();

        expect(() => {
            structure.run(42);
        }).to.throw('Must be a boolean');
    });

    it('String', () => {
        const structure = Structure.boolean();

        expect(() => {
            structure.run('test');
        }).to.throw('Must be a boolean');
    });

    it('Object', () => {
        const structure = Structure.boolean();

        expect(() => {
            structure.run({});
        }).to.throw('Must be a boolean');
    });

    it('Array', () => {
        const structure = Structure.boolean();

        expect(() => {
            structure.run([]);
        }).to.throw('Must be a boolean');
    });

    it('Basic Required Passed', () => {
        const structure = Structure.boolean()
            .aspect('required', Attribute.required());

        return structure.run(true).then((attributeValues) => {
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
        const structure = Structure.boolean()
            .aspect('required', Attribute.required());

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
