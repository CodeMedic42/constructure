import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import isFinite from 'lodash/isFinite';
import Aspect from './aspect';

const maxLogic = (message, value, aspectValue) => {
    if (!isFinite(aspectValue)) {
        throw new Error('Aspect Value must be a number or a function which returns a number');
    }

    if (isNil(value) || value <= aspectValue) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
};

export default (aspectValue, options = {}) => {
    const {
        id = 'max',
        message = 'Max',
        isFatal = true,
        require,
    } = options;

    return new Aspect(id, aspectValue, {
        validator: {
            onValidate: maxLogic.bind(null, message),
            isFatal,
        },
        require,
    });
};
