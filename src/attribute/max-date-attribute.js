import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import isDate from 'lodash/isDate';
import Attribute from './attribute';

const maxDataLogic = (message, value, attributeValue) => {
    if (!isDate(attributeValue)) {
        throw new Error('Attribute Value must be a date');
    }

    if (!isDate(value) || value <= attributeValue) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
};

export default (attributeValue, message = 'Max Date', fatal = true, requirements) => {
    const attribute = (new Attribute(attributeValue))
        .setValidator(maxDataLogic.bind(null, message), fatal);

    if (!isNil(requirements)) {
        return attribute.setRequirements(requirements);
    }

    return attribute;
};
