import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import isDate from 'lodash/isDate';
import Aspect from './aspect';

const maxDataLogic = (message, value, aspectValue) => {
    if (!isDate(aspectValue)) {
        throw new Error('Aspect Value must be a date');
    }

    if (!isDate(value) || value <= aspectValue) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
};

export default (aspectValue, message = 'Max Date', fatal = true, requirements) => {
    const aspect = (new Aspect(aspectValue))
        .setValidator(maxDataLogic.bind(null, message), fatal);

    if (!isNil(requirements)) {
        return aspect.setRequirements(requirements);
    }

    return aspect;
};
