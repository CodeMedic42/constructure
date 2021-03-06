import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import Aspect from './aspect';

function patternLogic(message, value, aspectValue) {
    if (isNil(value) || aspectValue.test(value)) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
}

export default (aspectValue, options = {}) => {
    const {
        id = 'pattern',
        message = 'Pattern',
        isFatal = true,
        require,
    } = options;

    return new Aspect(id, aspectValue, {
        validator: {
            onValidate: patternLogic.bind(null, message),
            isFatal,
        },
        require,
    });
};
