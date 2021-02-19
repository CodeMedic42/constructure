import isNil from "lodash/isNil";
import set from "lodash/set";
import get from "lodash/get";

export default function load(obj, path, def) {
    let val = get(obj, path);

    if (isNil(val)) {
        val = def;

        set(obj, path, val);
    }

    return val;
}
