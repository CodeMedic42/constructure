import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';

function patternLogic(message, value, attributeValue) {
    if (isNil(value) || attributeValue.test(value)) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
}

export default (Attribute) => (attributeValue, message = 'Pattern', fatal = true, requirements) => {
    const attribute = (new Attribute(attributeValue))
        .setValidator(patternLogic.bind(null, message), fatal);

    if (!isNil(requirements)) {
        return attribute.setRequirements(requirements);
    }

    return attribute;
};
