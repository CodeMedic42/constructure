const Structure = require('../src');
const chai = require('chai');
const spies = require('chai-spies');

const expect = chai.expect;

chai.use(spies);

describe('Structure', () => {
    it('Verify', () => {
        const testValue = 'test';

        const spy = chai.spy();

        const structure = new Structure(spy);

        structure.verify(testValue);

        expect(spy).to.have.been.called.with(testValue);
    });

    it('validate', () => {
        const testContext = {};
        const testValue = 'test';
        
        const spy = chai.spy();

        const structure = new Structure(null, spy);

        structure.validate(testContext, testValue);

        expect(spy).to.have.been.called.with.exactly(testContext, testValue);
    });

    it('verify returns structure', () => {
        const testContext = {};
        const testValue = 'test';

        const validatorSpy = chai.spy();
        
        const toBeReturned = new Structure(null, validatorSpy);

        const verifySpy = chai.spy(() => toBeReturned);

        const structure = new Structure(verifySpy, null);

        structure.verify(testValue);
        structure.validate(testContext, testValue);

        expect(verifySpy).to.have.been.called.with.exactly(testValue);
        expect(validatorSpy).to.have.been.called.with.exactly(testContext, testValue);
    });
});