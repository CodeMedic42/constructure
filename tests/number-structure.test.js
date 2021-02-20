import chai from 'chai';
import Structure from '../src';
import Attribute from '../src/attributes/attribute';

const { expect } = chai;

describe('Number Structure', () => {
    it('Null Value', () => {
        const structure = Structure.number();

        return structure.run(null).then((attributeValues) => {
            expect(attributeValues).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Zero number', () => {
        const structure = Structure.number();

        return structure.run(0).then((attributeValues) => {
            expect(attributeValues).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Basic number', () => {
        const structure = Structure.number();

        return structure.run(5).then((attributeValues) => {
            expect(attributeValues).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('String', () => {
        const structure = Structure.number();

        expect(() => {
            structure.run('test');
        }).to.throw('Must be a number');
    });

    it('Boolean', () => {
        const structure = Structure.number();

        expect(() => {
            structure.run(true);
        }).to.throw('Must be a number');
    });

    it('Object', () => {
        const structure = Structure.number();

        expect(() => {
            structure.run({});
        }).to.throw('Must be a number');
    });

    it('Array', () => {
        const structure = Structure.number();

        expect(() => {
            structure.run([]);
        }).to.throw('Must be a number');
    });

    it('Basic Required Passed', () => {
        const structure = Structure.number()
            .attributes({
                required: Attribute.required(),
            });

        return structure.run(5).then((attributeValues) => {
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
        const structure = Structure.number()
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

    it('Basic Min Passed', () => {
        const structure = Structure.number()
            .attributes({
                min: Attribute.min(3),
            });

        return structure.run(5).then((attributeValues) => {
            expect(attributeValues).to.eql({
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
            .attributes({
                min: Attribute.min(8),
            });

        return structure.run(5).then((attributeValues) => {
            expect(attributeValues).to.eql({
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
            .attributes({
                max: Attribute.max(8),
            });

        return structure.run(5).then((attributeValues) => {
            expect(attributeValues).to.eql({
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
            .attributes({
                max: Attribute.max(3),
            });

        return structure.run(5).then((attributeValues) => {
            expect(attributeValues).to.eql({
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
