import chai from 'chai';
import Structure from '../src';
import Attribute from '../src/attributes/attribute';

const { expect } = chai;

describe('Array Structure', () => {
    it('Null Value', () => {
        const structure = Structure.array();

        return structure.run(null).then((attributeValues) => {
            expect(attributeValues).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Undefined Value', () => {
        const structure = Structure.array();

        return structure.run().then((attributeValues) => {
            expect(attributeValues).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Array Value', () => {
        const structure = Structure.array();

        return structure.run([]).then((attributeValues) => {
            expect(attributeValues).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Number Value', () => {
        const structure = Structure.array();

        expect(() => {
            structure.run(42);
        }).to.throw('Must be an array');
    });

    it('String Value', () => {
        const structure = Structure.array();

        expect(() => {
            structure.run('test');
        }).to.throw('Must be an array');
    });

    it('Boolean Value', () => {
        const structure = Structure.array();

        expect(() => {
            structure.run(true);
        }).to.throw('Must be an array');
    });

    it('Object Value', () => {
        const structure = Structure.array();

        expect(() => {
            structure.run({});
        }).to.throw('Must be an array');
    });

    it('Basic Required Passed', () => {
        const structure = Structure.array()
            .attributes({
                required: Attribute.required(),
            });

        return structure.run([]).then((attributeValues) => {
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
        const structure = Structure.array()
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
