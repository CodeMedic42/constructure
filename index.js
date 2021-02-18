const Structure = require('./src');
const Validator = require('./src/validators/validator');

const fatal = true;
const nonFatal = false;

const structure = Structure.shape({
    basicString: Structure.string(),
    staticNullAttribute: Structure.string({
        flagged: null,
    }),
    staticAttribute: Structure.string({
        flagged: 42,
    }),
    dynamicNullAttribute: Structure.string({
        flagged: () => null,
    }),
    dynamicAttribute: Structure.string({
        flagged: () => 42,
    }),
    fatalStaticNullValidator: Structure.string({
        flagged: [null, new Validator(({attributeValue}) => 'Message ' + attributeValue, fatal)],
    }),
    nonFatalStaticNullValidator: Structure.string({
        flagged: [null, new Validator(({attributeValue}) => 'Message ' + attributeValue, nonFatal)],
    }),
    fatalStaticValidator: Structure.string({
        flagged: [42, new Validator(({attributeValue}) => 'Message ' + attributeValue, fatal)],
    }),
    nonFatalStaticValidator: Structure.string({
        flagged: [42, new Validator(({attributeValue}) => 'Message ' + attributeValue, nonFatal)],
    }),
    fatalDynamicNullValidator: Structure.string({
        flagged: [() => null, new Validator(({attributeValue}) => 'Message ' + attributeValue, nonFatal)],
        required: Validator.required(),
    }),
    nonFatalDynamicNullValidator: Structure.string({
        flagged: [() => null, new Validator(({attributeValue}) => 'Message ' + attributeValue, nonFatal)],
    }),
    fatalDynamicValidator: Structure.string({
        flagged: [() => 42, new Validator(({attributeValue}) => 'Message ' + attributeValue, fatal)],
    }),
    nonFatalDynamicValidator: Structure.string({
        flagged: [() => 42, new Validator(({attributeValue}) => 'Message ' + attributeValue, nonFatal)],
    }),
    fatalDynamicValidatorWithReq: Structure.string({
        req: 42,
        flagged: [() => 42, new Validator(({attributeValue}) => 'Message ' + attributeValue, fatal, ['req'])],
    }),
    fatalDynamicValidatorWithPassingReq: Structure.string({
        req: [() => 42, new Validator(() => null, fatal)],
        flagged: [() => 42, new Validator(({attributeValue}) => 'Message ' + attributeValue, fatal, ['req'])],
    }),
    fatalDynamicValidatorWithNonFatalReq: Structure.string({
        req: [() => 42, new Validator(() => 'Message', nonFatal)],
        flagged: [() => 42, new Validator(({attributeValue}) => 'Message ' + attributeValue, fatal, ['req'])],
    }),
    fatalDynamicValidatorWithFatalReq: Structure.string({
        req: [() => 42, new Validator(() => 'Message', fatal)],
        flagged: [() => 42, new Validator(({attributeValue}) => 'Message ' + attributeValue, fatal, ['req'])],
    }),
    complexReqA: Structure.string({
        reqA: [42, new Validator(() => 'Message', fatal, ['reqB'])],
        flagged: [42, new Validator(() => 'Message', fatal, ['reqA'])],
        reqB: [42, new Validator(() => 'Message', fatal)],
    }),
    missingReqC: Structure.string({
        reqA: [42, new Validator(() => 'Message', fatal, ['reqB'])],
        flagged: [42, new Validator(() => 'Message', fatal, ['reqA'])],
        reqB: [42, new Validator(() => 'Message', fatal, ['reqC'])],
    }),
}, {
    flagged: [42, new Validator(() => 'Message', fatal, ['reg', { path: 'asdas.$index.asdas', attributes: [] }, '$parent.asdas.asdas', '$this.asdas.asdas'])],
});

const value = {
    basicString: '',
    staticNullAttribute: '',
    staticAttribute: '',
    dynamicNullAttribute: '',
    dynamicAttribute: '',
    fatalStaticNullValidator: '',
    nonFatalStaticNullValidator: '',
    fatalStaticValidator: '',
    nonFatalStaticValidator: '',
    fatalDynamicNullValidator: '',
    nonFatalDynamicNullValidator: '',
    fatalDynamicValidator: '',
    nonFatalDynamicValidator: '',
    fatalDynamicValidatorWithReq: '',
    fatalDynamicValidatorWithPassingReq: '',
    fatalDynamicValidatorWithNonFatalReq: '',
    fatalDynamicValidatorWithFatalReq: '',
    complexReqA: '',
    missingReqC: '',
};

const attributeValues = Structure.run(structure, value);

console.log(JSON.stringify(attributeValues, null, 2));