import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import Aspect from './aspect';

function requiredLogic(message, value, aspectValue) {
    if (aspectValue !== true || !isNil(value)) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
}

export default (aspectValue = true, options = {}) => {
    const {
        message = 'Required',
        isFatal = true,
        require,
    } = options;

    return new Aspect(aspectValue, {
        validator: {
            onValidate: requiredLogic.bind(null, message),
            isFatal,
        },
        require,
    });
};
