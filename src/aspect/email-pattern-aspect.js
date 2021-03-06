import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import Aspect from './aspect';

const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function emailPatternLogic(message, value, aspectValue) {
    if (aspectValue !== true || isNil(value) || emailPattern.test(value)) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
}

export default (aspectValue = true, options = {}) => {
    const {
        id = 'emailPattern',
        message = 'Email Pattern',
        isFatal = true,
        require,
    } = options;

    return new Aspect(id, aspectValue, {
        validator: {
            onValidate: emailPatternLogic.bind(null, message),
            isFatal,
        },
        require,
    });
};
