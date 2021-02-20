import Symbol from 'es6-symbol';
import toPath from 'lodash/toPath';
import isString from 'lodash/isString';
import split from 'lodash/split';
import reduce from 'lodash/reduce';

const FIELDS = {
    requirements: Symbol('requirements'),
};

class Requirements {
    constructor(requirements) {
        this[FIELDS.requirements] = reduce(requirements, (acc, requirement) => {
            if (isString(requirement)) {
                const parts = split(requirement, ':');

                let attribute = null;
                let path = null;

                if (parts.length <= 1) {
                    attribute = parts[0];
                    path = '$this';
                } else {
                    attribute = parts[1];
                    path = parts[0];
                }

                acc.push({
                    path: toPath(path),
                    attribute,
                });
            } else {
                acc.push({
                    path: toPath(requirement.path),
                    attribute: requirement.attribute,
                });
            }

            return acc;
        }, []);
    }

    get() {
        return this[FIELDS.requirements];
    }
}

export default Requirements;
