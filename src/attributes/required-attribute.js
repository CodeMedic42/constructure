import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';

export default (Attribute) => (attributeValue = true, message = 'Required', fatal = true) => {
    const logic = (context) => {
        if (context.attributeValue !== true || !isNil(context.value)) {
            return null;
        }

        if (isFunction(message)) {
            return message(context);
        }

        return message;
    };

    return (new Attribute(attributeValue)).setValidator(logic, fatal)
};