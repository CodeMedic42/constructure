import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import isFinite from 'lodash/isFinite';

export default (Attribute) => (attributeValue, message = 'Max Length', fatal) => {
    if (!isFinite(attributeValue) && !isFunction(attributeValue)) {
        throw new Error('Attribute Value must be a number or a function which returns a number');
    }

    const logic = (context) => {
        if (isNil(context.value) || context.value.length <= context.attributeValue) {
            return null;
        }

        if (isFunction(message)) {
            return message(context);
        }

        return message;
    };

    return (new Attribute(attributeValue)).setValidator(logic, fatal)
};
