import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import join from 'lodash/join';
import { findIndex, isUndefined } from 'lodash';
import Aspect from './aspect';

function typeLogic(message, value, aspectValue, requirements, observedType) {
    if (isNil(aspectValue) || aspectValue.length <= 0 || isUndefined(value)) {
        return null;
    }

    let allowedTypes = aspectValue;

    if (isString(aspectValue)) {
        if (observedType === aspectValue) {
            return null;
        }

        allowedTypes = [aspectValue];
    } else {
        const index = findIndex(aspectValue, observedType);

        if (index >= 0) {
            return null;
        }
    }

    if (isFunction(message)) {
        return message(allowedTypes);
    }

    return message;
}

function messageWriter(allowedTypes) {
    if (allowedTypes.length === 1) {
        return `Must be a ${allowedTypes[0]} value.`;
    }

    return `Must be one the following types, ${join(allowedTypes, ',')}.`;
}

export default (aspectValue = null, options = {}) => {
    const {
        id = 'type',
        message = messageWriter,
        isFatal = true,
        require,
    } = options;

    return new Aspect(id, aspectValue, {
        validator: {
            onValidate: typeLogic.bind(null, message),
            isFatal,
        },
        require,
    });
};
