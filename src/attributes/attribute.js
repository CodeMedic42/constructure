import Symbol from 'es6-symbol';
import isFunction from 'lodash/isFunction';
import Validator from '../validators/validator';
import Requirements from '../requirements';
import requiredAttribute from './required-attribute';
import maxLengthAttribute from './max-length-attribute';
import maxAttribute from './max-attribute';
import minLengthAttribute from './min-length-attribute';
import minAttribute from './min-attribute';
import validDateAttribute from './valid-date-attribute';
import minDateAttribute from './min-date-attribute';
import maxDateAttribute from './max-date-attribute';
import patternAttribute from './pattern-attribute';
import emailPatternAttribute from './email-pattern-attribute';

const FIELDS = {
    value: Symbol('value'),
    validator: Symbol('validator'),
    requirements: Symbol('requirements'),
};

class Attribute {
    constructor(value) {
        this[FIELDS.value] = isFunction(value) ? value : () => value;
        this[FIELDS.validator] = null;
        this[FIELDS.requirements] = new Requirements();
    }

    setValidator(callback, isFatal) {
        this[FIELDS.validator] = new Validator(callback, isFatal);

        return this;
    }

    setRequirements(requirements) {
        this[FIELDS.requirements] = new Requirements(requirements);

        return this;
    }

    getValue() {
        return this[FIELDS.value];
    }

    getValidator() {
        return this[FIELDS.validator];
    }

    getRequirements() {
        return this[FIELDS.requirements];
    }
}

Attribute.required = requiredAttribute(Attribute);
Attribute.maxLength = maxLengthAttribute(Attribute);
Attribute.max = maxAttribute(Attribute);
Attribute.minLength = minLengthAttribute(Attribute);
Attribute.min = minAttribute(Attribute);
Attribute.validDate = validDateAttribute(Attribute);
Attribute.minDate = minDateAttribute(Attribute);
Attribute.maxDate = maxDateAttribute(Attribute);
Attribute.patternDate = patternAttribute(Attribute);
Attribute.emailPattern = emailPatternAttribute(Attribute);

export default Attribute;
