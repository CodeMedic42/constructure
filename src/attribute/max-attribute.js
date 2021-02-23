import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import isFinite from 'lodash/isFinite';
import Attribute from './attribute';

const maxLogic = (message, value, attributeValue) => {
    if (!isFinite(attributeValue)) {
        throw new Error('Attribute Value must be a number or a function which returns a number');
    }

    if (isNil(value) || value <= attributeValue) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
};

export default (attributeValue, options = {}) => {
    const {
        message = 'Max',
        fatal = true,
        requirements,
    } = options;

    const attribute = (new Attribute(attributeValue))
        .setValidator(maxLogic.bind(null, message), fatal);

    if (!isNil(requirements)) {
        return attribute.setRequirements(requirements);
    }

    return attribute;
};
