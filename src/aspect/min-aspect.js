import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import isFinite from 'lodash/isFinite';
import isPlainObject from 'lodash/isPlainObject';
import Aspect from './aspect';

function minLogic(message, value, aspectValue) {
    if (isNil(aspectValue) || isNil(value)) {
        return null;
    }

    let min = aspectValue;
    let exclusive = false;

    if (!isFinite(aspectValue)) {
        if (!isPlainObject(aspectValue)) {
            throw new Error('Aspect Value must be a number');
        }

        ({ min, exclusive } = aspectValue);
    }

    if (exclusive) {
        if (min < value) {
            return null;
        }
    } else if (min <= value) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
}

export default (aspectValue, options = {}) => {
    const {
        id = 'min',
        message = 'Min',
        isFatal = true,
        require,
    } = options;

    return new Aspect(id, aspectValue, {
        validator: {
            onValidate: minLogic.bind(null, message),
            isFatal,
        },
        require,
    });
};
