import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import isFinite from 'lodash/isFinite';

function minLengthLogic(message, value, attributeValue) {
    if (!isFinite(attributeValue)) {
        throw new Error('Attribute Value must be a number');
    }

    if (isNil(value) || attributeValue <= value.length) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
};

export default (Attribute) => (attributeValue, message = 'Min Length', fatal = true) => {
    return (new Attribute(attributeValue)).setValidator(minLengthLogic.bind(null, message), fatal)
};