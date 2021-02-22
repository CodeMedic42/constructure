import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import isNaN from 'lodash/isNaN';
import Attribute from './attribute';

function convertToDate(value, attributeValue) {
    if (attributeValue === false) {
        return null;
    }

    return new Date(value);
}

function attributeValueLogic(attributeValue, value, requirements) {
    if (isNil(value)) {
        return null;
    }

    if (isFunction(attributeValue)) {
        return Promise.resolve(attributeValue(value, requirements))
            .then(convertToDate.bind(null, value));
    }

    return convertToDate(value, attributeValue);
}

function validDateLogic(message, _, attributeValue) {
    if (isNil(attributeValue)) {
        return null;
    }

    const time = attributeValue.getTime();

    if (!isNaN(time)) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
}

export default (attributeValue = true, message = 'Invalid Date', fatal = true, requirements) => {
    const attribute = (new Attribute(attributeValueLogic.bind(null, attributeValue)))
        .setValidator(validDateLogic.bind(null, message), fatal);

    if (!isNil(requirements)) {
        return attribute.setRequirements(requirements);
    }

    return attribute;
};
