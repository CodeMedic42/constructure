import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import isFinite from 'lodash/isFinite';
import Aspect from './aspect';

function minLogic(message, value, aspectValue) {
    if (!isFinite(aspectValue)) {
        throw new Error('Aspect Value must be a number');
    }

    if (isNil(value) || aspectValue <= value) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
}

export default (aspectValue, options = {}) => {
    const {
        message = 'Min',
        isFatal = true,
        requirements,
    } = options;

    return new Aspect(aspectValue, {
        validator: {
            onValidate: minLogic.bind(null, message),
            isFatal,
        },
        requirements,
    });
};