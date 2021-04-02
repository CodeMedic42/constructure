import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import isFinite from 'lodash/isFinite';
import Aspect from './aspect';

function divisibleLogic(message, value, aspectValue) {
    if (!isFinite(aspectValue) || isNil(value) || value % aspectValue === 0) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
}

export default (aspectValue = true, options = {}) => {
    const {
        id = 'divisible',
        message = 'Divisible',
        isFatal = true,
        require,
    } = options;

    return new Aspect(id, aspectValue, {
        validator: {
            onValidate: divisibleLogic.bind(null, message),
            isFatal,
        },
        require,
    });
};
