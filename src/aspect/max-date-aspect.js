import isFunction from 'lodash/isFunction';
import isDate from 'lodash/isDate';
import Aspect from './aspect';

const maxDataLogic = (message, value, aspectValue) => {
    if (!isDate(aspectValue)) {
        throw new Error('Aspect Value must be a date');
    }

    if (!isDate(value) || value <= aspectValue) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
};

export default (aspectValue, options = {}) => {
    const {
        message = 'Max Date',
        isFatal = true,
        require,
    } = options;

    return new Aspect(aspectValue, {
        validator: {
            onValidate: maxDataLogic.bind(null, message),
            isFatal,
        },
        require,
    });
};
