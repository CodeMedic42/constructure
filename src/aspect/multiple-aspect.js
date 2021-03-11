import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import isFinite from 'lodash/isFinite';
import Aspect from './aspect';

function multipleLogic(message, value, aspectValue) {
    if (isNil(aspectValue) || isNil(value)) {
        return null;
    }

    if (!isFinite(aspectValue)) {
        throw new Error('Aspect Value must be a number or a function which returns a number');
    }

    if (value % aspectValue === 0) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
}

export default (aspectValue = true, options = {}) => {
    const {
        id = 'multiple',
        message = 'Multiple',
        isFatal = true,
        require,
    } = options;

    return new Aspect(id, aspectValue, {
        validator: {
            onValidate: multipleLogic.bind(null, message),
            isFatal,
        },
        require,
    });
};
