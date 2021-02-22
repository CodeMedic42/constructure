import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import isDate from 'lodash/isDate';

const minDateLogic = (message, value, attributeValue) => {
    if (!isDate(attributeValue)) {
        throw new Error('Attribute Value must be a date');
    }

    if (!isDate(value) || attributeValue <= value) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
};

export default (Attribute) => (attributeValue, message = 'Min Date', fatal = true, requirements) => {
    const attribute = (new Attribute(attributeValue))
        .setValidator(minDateLogic.bind(null, message), fatal);

    if (!isNil(requirements)) {
        return attribute.setRequirements(requirements);
    }

    return attribute;
};
