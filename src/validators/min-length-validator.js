import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import isFinite from 'lodash/isFinite';

export default (Validator) => (attributeValue, message = 'Min Length', fatal, requirements) => {
    if (!isFinite(attributeValue) && !isFunction(attributeValue)) {
        throw new Error('Attribute Value must be a number or a function which returns a number');
    }

    const logic = (context) => {
        if (isNil(context.value) || context.attributeValue <= context.value.length) {
            return null;
        }

        if (isFunction(message)) {
            return message(context);
        }

        return message;
    };

    return [attributeValue, new Validator(logic, fatal, requirements)];
};
