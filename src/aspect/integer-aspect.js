import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import isInteger from 'lodash/isInteger';
import Aspect from './aspect';

function integerLogic(message, value, aspectValue) {
    if (aspectValue !== true || isNil(value) || isInteger(value)) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
}

export default (aspectValue = true, options = {}) => {
    const {
        id = 'integer',
        message = 'Integer',
        isFatal = true,
        require,
    } = options;

    return new Aspect(id, aspectValue, {
        validator: {
            onValidate: integerLogic.bind(null, message),
            isFatal,
        },
        require,
    });
};
