import isNil from 'lodash/isNil';
import isNumber from 'lodash/isNumber';

export default function createRuntime(parentRuntime, segment) {
    const { value } = parentRuntime.$this;

    let { indexes } = parentRuntime;

    if (isNumber(segment)) {
        indexes = indexes.concat(segment);
    }

    if (parentRuntime.absolutePath.length >= parentRuntime.options.maxPathDepth) {
        throw new Error('Possible infinite loop detected');
    }

    return {
        $root: parentRuntime.$root,
        $this: {
            value: !isNil(value) ? value[segment] : undefined,
            aspectResults: null,
        },
        absolutePath: parentRuntime.absolutePath.concat(segment),
        indexes,
        options: parentRuntime.options,
    };
}
