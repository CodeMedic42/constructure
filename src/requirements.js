import Symbol from 'es6-symbol';
import toPath from 'lodash/toPath';
import isString from 'lodash/isString';
import split from 'lodash/split';
import reduce from 'lodash/reduce';
import { startsWith } from 'lodash';

const FIELDS = {
    requirements: Symbol('requirements'),
};

/*
'' === '$this'
':att' === '$this:att'
'abc' === '$this.abc'
'abc:att' === '$this.abc:att'
'$this' Get the current value
'$this:att' Get the aspect at the current value
'$this.abc' Get the value of the child at the current value
'$this.abc:att' Get the aspect at the value of the child at the current value
'$root' Get the root value
'$root:att' Get the aspect at the root value
'$root.abc' Get the value of the child at the root value
'$root.abc:att' Get the aspect at the value of the child at the root value
'$parent' Get the value of the parent from the current value
'$parent:att' Get the aspect of the value of the parent from the current value
'$parent.abc' Get the value of the child of the parent from the current value
'$parent.abc:att' Get the aspect of the value of the child of the parent from the current value
*/
class Requirements {
    constructor(requirements) {
        this[FIELDS.requirements] = reduce(requirements, (acc, requirement) => {
            let path = null;
            let aspect = null;

            if (isString(requirement)) {
                const parts = split(requirement, ':');

                [path, aspect] = parts;
            } else {
                path = requirement.path;
                aspect = requirement.aspect;
            }

            path = toPath(path);

            if (!startsWith(path[0], '$')) {
                path.splice(0, 0, '$this');
            }

            acc.push({
                path,
                aspect,
            });

            return acc;
        }, []);
    }

    get() {
        return this[FIELDS.requirements];
    }
}

export default Requirements;
