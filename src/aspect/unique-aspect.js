import isFunction from 'lodash/isFunction';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import clone from 'lodash/clone';
import Aspect from './aspect';

function uniqueLogic(message, value, aspectValue, required) {
    if (aspectValue !== true) {
        return null;
    }

    const key = required[required.length - 1];

    if (key[value] !== true) {
        key[value] = true;

        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
}

export default (keyLocation, aspectValue = true, options = {}) => {
    const {
        id = 'unique',
        message = 'Unique',
        isFatal = true,
        require,
    } = options;

    if (isEmpty(keyLocation)) {
        throw new Error('Key location is required and cannot be empty');
    }

    const fullRequire = !isNil(require) ? clone(require) : [];

    fullRequire.push(keyLocation);

    return new Aspect(id, aspectValue, {
        validator: {
            onValidate: uniqueLogic.bind(null, message),
            isFatal,
        },
        require: fullRequire,
    });
};
