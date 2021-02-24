import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import isFinite from 'lodash/isFinite';
import Aspect from './aspect';

const maxLengthLogic = (message, value, aspectValue) => {
    if (!isFinite(aspectValue)) {
        throw new Error('Aspect Value must be a number');
    }

    if (isNil(value) || value.length <= aspectValue) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
};

export default (aspectValue, options = {}) => {
    const {
        message = 'Max Length',
        isFatal = true,
        require,
    } = options;

    return new Aspect(aspectValue, {
        validator: {
            onValidate: maxLengthLogic.bind(null, message),
            isFatal,
        },
        require,
    });
};
