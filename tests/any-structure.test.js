import chai from 'chai';
import Structure, { Attribute } from '../src';

const { expect } = chai;

describe('Any Structure', () => {
    it('Null Value', () => {
        const structure = Structure.any();

        return structure.run(null).then((attributeValues) => {
            expect(attributeValues).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Undefined Value', () => {
        const structure = Structure.any();

        return structure.run().then((attributeValues) => {
            expect(attributeValues).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('String Value', () => {
        const structure = Structure.any();

        return structure.run('test').then((attributeValues) => {
            expect(attributeValues).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Number Value', () => {
        const structure = Structure.any();

        return structure.run(42).then((attributeValues) => {
            expect(attributeValues).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Boolean', () => {
        const structure = Structure.any();

        return structure.run(true).then((attributeValues) => {
            expect(attributeValues).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Object', () => {
        const structure = Structure.any();

        return structure.run({}).then((attributeValues) => {
            expect(attributeValues).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Array', () => {
        const structure = Structure.any();

        return structure.run([]).then((attributeValues) => {
            expect(attributeValues).to.eql({
                $r: 'pass',
                $a: {},
            });
        });
    });

    it('Basic Required Passed', () => {
        const structure = Structure.any()
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
        const structure = Structure.any()
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

    it('Basic MinLength Passed', () => {
        const structure = Structure.any()
            .attributes({
                minLength: Attribute.minLength(3),
            });

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
        const structure = Structure.any()
            .attributes({
                minLength: Attribute.minLength(8),
            });

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
        const structure = Structure.any()
            .attributes({
                maxLength: Attribute.maxLength(8),
            });

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
        const structure = Structure.any()
            .attributes({
                maxLength: Attribute.maxLength(3),
            });

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
