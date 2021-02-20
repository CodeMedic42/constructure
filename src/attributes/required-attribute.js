import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';

function requiredLogic(message, value, attributeValue) {
    if (attributeValue !== true || !isNil(value)) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
};

export default (Attribute) => (attributeValue = true, message = 'Required', fatal = true) => {
    return (new Attribute(attributeValue)).setValidator(requiredLogic.bind(null, message), fatal)
};