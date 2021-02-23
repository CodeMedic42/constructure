import chai from 'chai';
import Structure, { Attribute } from '../src';

const { expect } = chai;

describe('String Structure', () => {
    it('Null Value', () => {
        const structure = Structure.string();

        return structure.run(null).then((attributeValues) => {
            expect(attributeValues).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Empty String', () => {
        const structure = Structure.string();

        return structure.run('').then((attributeValues) => {
            expect(attributeValues).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Basic String', () => {
        const structure = Structure.string();

        return structure.run('test').then((attributeValues) => {
            expect(attributeValues).to.eql({
                $r: 'pass',
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
            .aspect('required', Attribute.required());

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

    it('Basic MinLength Passed', () => {
        const structure = Structure.string()
            .aspect('minLength', Attribute.minLength(3));

        return structure.run('test').then((attributeValues) => {
            expect(attributeValues).to.eql({
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
            .aspect('minLength', Attribute.minLength(8));

        return structure.run('test').then((attributeValues) => {
            expect(attributeValues).to.eql({
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
            .aspect('maxLength', Attribute.maxLength(8));

        return structure.run('test').then((attributeValues) => {
            expect(attributeValues).to.eql({
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
            .aspect('maxLength', Attribute.maxLength(3));

        return structure.run('test').then((attributeValues) => {
            expect(attributeValues).to.eql({
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
