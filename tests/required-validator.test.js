// import chai from 'chai';
// import spies from 'chai-spies';
// import Validator from '../src/validators/validator';

// const { expect } = chai;

// chai.use(spies);

// xdescribe('Required Validator', () => {
//     it('Default Constructor Params', () => {
//         const aspectConfiguration = Validator.required();

//         expect(aspectConfiguration[0]).to.equal(true);
//         expect(aspectConfiguration[1]).to.be.instanceOf(Validator);

//         const validator = aspectConfiguration[1];

//         const requirements = validator.getRequirements();

//         expect(requirements).to.be.instanceOf(Array);
//         expect(requirements.length).to.equal(0);
//     });

//     it('True aspect value', () => {
//         const aspectConfiguration = Validator.required(true);

//         expect(aspectConfiguration[0]).to.equal(true);
//         expect(aspectConfiguration[1]).to.be.instanceOf(Validator);

//         const validator = aspectConfiguration[1];

//         const requirements = validator.getRequirements();

//         expect(requirements).to.be.instanceOf(Array);
//         expect(requirements.length).to.equal(0);
//     });

//     it('False aspect value', () => {
//         const aspectConfiguration = Validator.required(false);

//         expect(aspectConfiguration[0]).to.equal(false);
//         expect(aspectConfiguration[1]).to.be.instanceOf(Validator);

//         const validator = aspectConfiguration[1];

//         const requirements = validator.getRequirements();

//         expect(requirements).to.be.instanceOf(Array);
//         expect(requirements.length).to.equal(0);
//     });

//     it('With requirements', () => {
//         const aspectConfiguration = Validator.required(
// undefined,
// undefined,
// undefined,
// ['foo']
// );

//         expect(aspectConfiguration[0]).to.equal(true);
//         expect(aspectConfiguration[1]).to.be.instanceOf(Validator);

//         const validator = aspectConfiguration[1];

//         const requirements = validator.getRequirements();

//         expect(requirements).to.be.instanceOf(Array);
//         expect(requirements.length).to.equal(1);
//         expect(requirements[0]).to.equal('foo');
//     });

//     it('Value Passes', () => {
//         const aspectConfiguration = Validator.required();

//         const validator = aspectConfiguration[1];

//         const context = {
//             get: () => {},
//         };
//         const value = 'test';
//         const requiredAspects = {};

//         const result = validator.run(runtime, aspectConfiguration[0], requiredAspects);

//         expect(result).to.be.null;
//     });

//     it('Value Fails: Default Constructor Values', () => {
//         const aspectConfiguration = Validator.required();

//         const validator = aspectConfiguration[1];

//         const context = {
//             get: () => {},
//         };
//         const value = null;
//         const requiredAspects = {};

//         const result = validator.run(runtime, aspectConfiguration[0], requiredAspects);

//         expect(result).to.not.be.null;
//         expect(result.getMessage()).to.equal('Required');
//         expect(result.isFatal()).to.equal(true);
//     });

//     it('Does not run when false aspect given', () => {
//         const aspectConfiguration = Validator.required(false);

//         const validator = aspectConfiguration[1];

//         const context = {
//             get: () => {},
//         };
//         const value = null;
//         const requiredAspects = {};

//         const result = validator.run(runtime, aspectConfiguration[0], requiredAspects);

//         expect(result).to.be.null;
//     });

//     it('Change default message', () => {
//         const testMessage = 'Custom Message';

//         const aspectConfiguration = Validator.required(undefined, testMessage);

//         const validator = aspectConfiguration[1];

//         const context = {
//             get: () => {},
//         };
//         const value = null;
//         const requiredAspects = {};

//         const result = validator.run(runtime, aspectConfiguration[0], requiredAspects);

//         expect(result).to.not.be.null;
//         expect(result.getMessage()).to.equal(testMessage);
//         expect(result.isFatal()).to.equal(true);
//     });

//     it('Change default fatal type', () => {
//         const testMessage = 'Custom Message';

//         const aspectConfiguration = Validator.required(undefined, testMessage, false);

//         const validator = aspectConfiguration[1];

//         const context = {
//             get: () => {},
//         };
//         const value = null;
//         const requiredAspects = {};

//         const result = validator.run(runtime, aspectConfiguration[0], requiredAspects);

//         expect(result).to.not.be.null;
//         expect(result.getMessage()).to.equal(testMessage);
//         expect(result.isFatal()).to.equal(false);
//     });
// });
