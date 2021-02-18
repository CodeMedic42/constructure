import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';

export default (Validator) => (attributeValue = true, message = 'Required', fatal, requirements) => {
    const logic = (context) => {
        if (context.attributeValue !== true || !isNil(context.value)) {
            return null;
        }

        if (isFunction(message)) {
            return message(context);
        }

        return message;
    };

    return [attributeValue, new Validator(logic, fatal, requirements)];
};
