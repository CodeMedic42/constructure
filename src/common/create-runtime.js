import { isNil } from "lodash";

export default function createRuntime(parentRuntime, segment) {
    // const runtime = {
    //     $root: {
    //         value,
    //         attributeResults: null,
    //     },
    //     $this: {
    //         value,
    //         attributeResults: null,
    //     },
    //     absolutePath: ''
    // };

    // if (isNil(parentRuntime)) {
    //     return runtime;
    // }

    return {
        $root: parentRuntime.$root,
        $this: {
            value: parentRuntime.$this.value[segment],
            attributeResults: null,
        },
        absolutePath: parentRuntime.absolutePath.concat(segment)
    }
}