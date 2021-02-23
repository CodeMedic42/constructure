import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import isDate from 'lodash/isDate';
import Aspect from './aspect';

const minDateLogic = (message, value, aspectValue, requirements) => {
    if (!isDate(aspectValue)) {
        throw new Error('Aspect Value must be a date');
    }

    let testValue = value;

    if (requirements.length > 0) {
        [testValue] = requirements;
    }

    if (!isDate(testValue) || aspectValue <= testValue) {
        return null;
    }

    if (isFunction(message)) {
        return message(context);
    }

    return message;
};

export default (aspectValue, message = 'Min Date', fatal = true, requirements) => {
    const aspect = (new Aspect(aspectValue))
        .setValidator(minDateLogic.bind(null, message), fatal);

    if (!isNil(requirements)) {
        return aspect.setRequirements(requirements);
    }

    return aspect;
};
