import chai from 'chai';
import spies from 'chai-spies';
import Validator from '../src/validators/validator';

const { expect } = chai;

chai.use(spies);

describe('Required Validator', () => {
    it('Default Constructor Params', () => {
        const attributeConfiguration = Validator.required();

        expect(attributeConfiguration[0]).to.equal(true);
        expect(attributeConfiguration[1]).to.be.instanceOf(Validator);

        const validator = attributeConfiguration[1];

        const requirements = validator.getRequirements();

        expect(requirements).to.be.instanceOf(Array);
        expect(requirements.length).to.equal(0);
    });

    it('True attribute value', () => {
        const attributeConfiguration = Validator.required(true);

        expect(attributeConfiguration[0]).to.equal(true);
        expect(attributeConfiguration[1]).to.be.instanceOf(Validator);

        const validator = attributeConfiguration[1];

        const requirements = validator.getRequirements();

        expect(requirements).to.be.instanceOf(Array);
        expect(requirements.length).to.equal(0);
    });

    it('False attribute value', () => {
        const attributeConfiguration = Validator.required(false);

        expect(attributeConfiguration[0]).to.equal(false);
        expect(attributeConfiguration[1]).to.be.instanceOf(Validator);

        const validator = attributeConfiguration[1];

        const requirements = validator.getRequirements();

        expect(requirements).to.be.instanceOf(Array);
        expect(requirements.length).to.equal(0);
    });

    it('With requirements', () => {
        const attributeConfiguration = Validator.required(undefined, undefined, undefined, ['foo']);

        expect(attributeConfiguration[0]).to.equal(true);
        expect(attributeConfiguration[1]).to.be.instanceOf(Validator);

        const validator = attributeConfiguration[1];

        const requirements = validator.getRequirements();

        expect(requirements).to.be.instanceOf(Array);
        expect(requirements.length).to.equal(1);
        expect(requirements[0]).to.equal('foo');
    });

    it('Value Passes', () => {
        const attributeConfiguration = Validator.required();

        const validator = attributeConfiguration[1];

        const context = {
            get: () => {},
        };
        const value = 'test';
        const requiredAttributes = {};

        const result = validator.run(context, value, attributeConfiguration[0], requiredAttributes);

        expect(result).to.be.null;
    });

    it('Value Fails: Default Constructor Values', () => {
        const attributeConfiguration = Validator.required();

        const validator = attributeConfiguration[1];

        const context = {
            get: () => {},
        };
        const value = null;
        const requiredAttributes = {};

        const result = validator.run(context, value, attributeConfiguration[0], requiredAttributes);

        expect(result).to.not.be.null;
        expect(result.getMessage()).to.equal('Required');
        expect(result.isFatal()).to.equal(true);
    });

    it('Does not run when false attribute given', () => {
        const attributeConfiguration = Validator.required(false);

        const validator = attributeConfiguration[1];

        const context = {
            get: () => {},
        };
        const value = null;
        const requiredAttributes = {};

        const result = validator.run(context, value, attributeConfiguration[0], requiredAttributes);

        expect(result).to.be.null;
    });

    it('Change default message', () => {
        const testMessage = 'Custom Message';

        const attributeConfiguration = Validator.required(undefined, testMessage);

        const validator = attributeConfiguration[1];

        const context = {
            get: () => {},
        };
        const value = null;
        const requiredAttributes = {};

        const result = validator.run(context, value, attributeConfiguration[0], requiredAttributes);

        expect(result).to.not.be.null;
        expect(result.getMessage()).to.equal(testMessage);
        expect(result.isFatal()).to.equal(true);
    });

    it('Change default fatal type', () => {
        const testMessage = 'Custom Message';

        const attributeConfiguration = Validator.required(undefined, testMessage, false);

        const validator = attributeConfiguration[1];

        const context = {
            get: () => {},
        };
        const value = null;
        const requiredAttributes = {};

        const result = validator.run(context, value, attributeConfiguration[0], requiredAttributes);

        expect(result).to.not.be.null;
        expect(result.getMessage()).to.equal(testMessage);
        expect(result.isFatal()).to.equal(false);
    });
});
