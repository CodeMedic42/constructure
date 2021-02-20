import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';

export default function getter(target, path, defaultValue) {
    if (path.length <= 0) {
        if (isUndefined(target)) {
            return defaultValue;
        }

        return target;
    }

    return get(target, path, defaultValue);
}
