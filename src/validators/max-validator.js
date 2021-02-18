const { isNil, isFunction } = require("lodash");

module.exports = (Validator) => {
    Validator.max = (attributeValue, message = 'Max', fatal, requirements) => {
        if (!isFinite(attributeValue) && !isFunction(attributeValue)) {
            throw new Error('Attribute Value must be a number or a function which returns a number');
        }

        const logic = (context) => {
            if (isNil(context.value) || context.value <= context.attributeValue) {
                return null;
            }

            if (isFunction(message)) {
                return message(context);
            }

            return message;
        };

        return [attributeValue, new Validator(logic, fatal, requirements)];
    }
}