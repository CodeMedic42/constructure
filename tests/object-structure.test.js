import chai from 'chai';
import Structure, { Attribute } from '../src';

const { expect } = chai;

describe('Object Structure', () => {
    it('Null Value', () => {
        const structure = Structure.object();

        return structure.run(null).then((attributeValues) => {
            expect(attributeValues).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Undefined Value', () => {
        const structure = Structure.object();

        return structure.run().then((attributeValues) => {
            expect(attributeValues).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Object Value', () => {
        const structure = Structure.object();

        return structure.run({}).then((attributeValues) => {
            expect(attributeValues).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Number Value', () => {
        const structure = Structure.object();

        expect(() => {
            structure.run(42);
        }).to.throw('Must be an object');
    });

    it('String Value', () => {
        const structure = Structure.object();

        expect(() => {
            structure.run('test');
        }).to.throw('Must be an object');
    });

    it('Boolean Value', () => {
        const structure = Structure.object();

        expect(() => {
            structure.run(true);
        }).to.throw('Must be an object');
    });

    it('Array Value', () => {
        const structure = Structure.object();

        expect(() => {
            structure.run([]);
        }).to.throw('Must be an object');
    });

    it('Basic Required Passed', () => {
        const structure = Structure.object()
            .attributes({
                required: Attribute.required(),
            });

        return structure.run({}).then((attributeValues) => {
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
        const structure = Structure.object()
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
