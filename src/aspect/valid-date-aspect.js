import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import isNaN from 'lodash/isNaN';
import Aspect from './aspect';

function convertToDate(value, aspectValue) {
    if (aspectValue === false) {
        return null;
    }

    if (value instanceof Date) {
        return value;
    }

    return new Date(value);
}

function aspectValueLogic(aspectValue, value, requirements) {
    if (isNil(value)) {
        return null;
    }

    if (isFunction(aspectValue)) {
        return Promise.resolve(aspectValue(value, requirements))
            .then(convertToDate.bind(null, value));
    }

    return convertToDate(value, aspectValue);
}

function validDateLogic(message, _, aspectValue) {
    if (isNil(aspectValue)) {
        return null;
    }

    const time = aspectValue.getTime();

    if (!isNaN(time)) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
}

export default (aspectValue = true, options) => {
    const {
        message = 'Invalid Date',
        isFatal = true,
        require,
    } = options;

    return new Aspect(aspectValueLogic.bind(null, aspectValue), {
        validator: {
            onValidate: validDateLogic.bind(null, message),
            isFatal,
        },
        require,
    });
};
