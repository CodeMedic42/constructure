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

export default (attributeValue = true, message = 'Required', fatal = true, requirements) => {
    const attribute = (new Attribute(attributeValue))
        .setValidator(requiredLogic.bind(null, message), fatal);

    if (!isNil(requirements)) {
        return attribute.setRequirements(requirements);
    }

    return attribute;
};
