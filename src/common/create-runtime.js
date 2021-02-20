import { isNil } from "lodash";

export default function createRuntime(parentRuntime, segment) {
    return {
        $root: parentRuntime.$root,
        $this: {
            value: parentRuntime.$this.value[segment],
            attributeResults: null,
        },
        absolutePath: parentRuntime.absolutePath.concat(segment)
    }
}