import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import isFinite from 'lodash/isFinite';
import isPlainObject from 'lodash/isPlainObject';
import Aspect from './aspect';

const maxLogic = (message, value, aspectValue) => {
    if (isNil(aspectValue) || isNil(value)) {
        return null;
    }

    let max = aspectValue;
    let exclusive = false;

    if (!isFinite(aspectValue)) {
        if (!isPlainObject(aspectValue)) {
            throw new Error('Aspect Value must be a number');
        }

        ({ max, exclusive } = aspectValue);
    }

    if (exclusive) {
        if (value < max) {
            return null;
        }
    } else if (value <= max) {
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
