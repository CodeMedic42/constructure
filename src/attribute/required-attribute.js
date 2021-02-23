import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import Attribute from './attribute';

function requiredLogic(message, value, attributeValue) {
    if (attributeValue !== true || !isNil(value)) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
}

export default (attributeValue = true, options = {}) => {
    const {
        message = 'Required',
        fatal = true,
        requirements,
    } = options;

    let attribute = (new Attribute(attributeValue))
        .setValidator(requiredLogic.bind(null, message), fatal);

    if (!isNil(requirements)) {
        attribute = attribute.setRequirements(requirements);
    }

    return attribute;
};
