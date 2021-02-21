import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import isFinite from 'lodash/isFinite';

const maxLengthLogic = (message, value, attributeValue) => {
    if (!isFinite(attributeValue)) {
        throw new Error('Attribute Value must be a number');
    }

    if (isNil(value) || value.length <= attributeValue) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
};

export default (Attribute) => (attributeValue, message = 'Max Length', fatal) => {
    return (new Attribute(attributeValue)).setValidator(maxLengthLogic.bind(null, message), fatal);
};
