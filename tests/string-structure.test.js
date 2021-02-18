const Structure = require('../src');
const Validator = require('../src/validators/validator');
const chai = require('chai');
const expect = chai.expect;

describe('String Structure', () => {
    it('Null Value', () => {
        const structure = Structure.string();

        const attributeValues = structure.run('');

        expect(attributeValues).to.eql({
            $r: null,
            $a: {}
        });
    });

    it('Empty String', () => {
        const structure = Structure.string();

        const attributeValues = structure.run('');

        expect(attributeValues).to.eql({
            $r: null,
            $a: {}
        });
    });

    it('Basic String', () => {
        const structure = Structure.string();

        const attributeValues = structure.run('test');

        expect(attributeValues).to.eql({
            $r: null,
            $a: {}
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
        const structure = Structure.string({
            required: Validator.required()
        });

        const attributeValues = structure.run('test');

        expect(attributeValues).to.eql({
            $r: 'pass',
            $a: {
                required: {
                    value: true,
                    result: 'pass',
                    message: null,
                }
            }
        });
    });

    it('Basic Required Fails', () => {
        const structure = Structure.string({
            required: Validator.required()
        });

        const attributeValues = structure.run();

        expect(attributeValues).to.eql({
            $r: 'fatal',
            $a: {
                required: {
                    value: true,
                    result: 'fatal',
                    message: 'Required',
                }
            }
        });
    });
});