import { isNil } from "lodash";

export default function createRuntime(parentRuntime, segment) {
    let { value } = parentRuntime.$this;

    return {
        $root: parentRuntime.$root,
        $this: {
            value: !isNil(value) ? value[segment] : undefined,
            attributeResults: null,
        },
        absolutePath: parentRuntime.absolutePath.concat(segment)
    }
}