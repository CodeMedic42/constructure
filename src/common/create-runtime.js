import isNil from 'lodash/isNil';
import isNumber from 'lodash/isNumber';

export default function createRuntime(parentRuntime, segment) {
    const { value } = parentRuntime.$this;

    let { indexes } = parentRuntime;

    if (isNumber(segment)) {
        indexes = indexes.concat(segment);
    }

    return {
        $root: parentRuntime.$root,
        $this: {
            value: !isNil(value) ? value[segment] : undefined,
            attributeResults: null,
        },
        absolutePath: parentRuntime.absolutePath.concat(segment),
        indexes,
    };
}
