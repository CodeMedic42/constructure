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
        message = 'Pattern',
        isFatal = true,
        requirements,
    } = options;

    return new Aspect(aspectValue, {
        validator: {
            onValidate: patternLogic.bind(null, message),
            isFatal,
        },
        requirements,
    });
};
