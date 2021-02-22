import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import Attribute from './attribute';

const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function emailPatternLogic(message, value, attributeValue) {
    if (attributeValue !== true || isNil(value) || emailPattern.test(value)) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
}

export default (attributeValue = true, message = 'Email Pattern', fatal = true, requirements) => {
    const attribute = (new Attribute(attributeValue))
        .setValidator(emailPatternLogic.bind(null, message), fatal);

    if (!isNil(requirements)) {
        return attribute.setRequirements(requirements);
    }

    return attribute;
};
