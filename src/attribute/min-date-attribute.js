import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import isDate from 'lodash/isDate';
import Attribute from './attribute';

const minDateLogic = (message, value, attributeValue, requirements) => {
    if (!isDate(attributeValue)) {
        throw new Error('Attribute Value must be a date');
    }

    let testValue = value;

    if (requirements.length > 0) {
        [testValue] = requirements;
    }

    if (!isDate(testValue) || attributeValue <= testValue) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
};

export default (attributeValue, message = 'Min Date', fatal = true, requirements) => {
    const attribute = (new Attribute(attributeValue))
        .setValidator(minDateLogic.bind(null, message), fatal);

    if (!isNil(requirements)) {
        return attribute.setRequirements(requirements);
    }

    return attribute;
};
