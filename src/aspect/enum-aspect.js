import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import findIndex from 'lodash/findIndex';
import isEqual from 'lodash/isEqual';
import Aspect from './aspect';

function enumLogic(message, value, aspectValue) {
    if (isNil(aspectValue) || isNil(value)) {
        return null;
    }

    const index = findIndex(aspectValue, (enumValue) => isEqual(enumValue, value));

    if (index >= 0) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
}

export default (aspectValue, options = {}) => {
    const {
        id = 'enum',
        message = 'Enum',
        isFatal = true,
        require,
    } = options;

    return new Aspect(id, aspectValue, {
        validator: {
            onValidate: enumLogic.bind(null, message),
            isFatal,
        },
        require,
    });
};
