import isFunction from 'lodash/isFunction';
import isDate from 'lodash/isDate';
import Aspect from './aspect';

const minDateLogic = (message, value, aspectValue, requirements) => {
    if (!isDate(aspectValue)) {
        throw new Error('Aspect Value must be a date');
    }

    let testValue = value;

    if (requirements.length > 0) {
        [testValue] = requirements;
    }

    if (!isDate(testValue) || aspectValue <= testValue) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
};

export default (aspectValue, options = {}) => {
    const {
        message = 'Min Date',
        isFatal = true,
        require,
    } = options;

    return new Aspect(aspectValue, {
        validator: {
            onValidate: minDateLogic.bind(null, message),
            isFatal,
        },
        require,
    });
};
