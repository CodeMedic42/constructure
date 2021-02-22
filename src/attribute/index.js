import Attribute from './attribute';
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

const createAttribute = (attributeValue) => {
    return new Attribute(attributeValue);
};

createAttribute.required = requiredAttribute;
createAttribute.maxLength = maxLengthAttribute;
createAttribute.max = maxAttribute;
createAttribute.minLength = minLengthAttribute;
createAttribute.min = minAttribute;
createAttribute.validDate = validDateAttribute;
createAttribute.minDate = minDateAttribute;
createAttribute.maxDate = maxDateAttribute;
createAttribute.patternDate = patternAttribute;
createAttribute.emailPattern = emailPatternAttribute;

export default createAttribute;
