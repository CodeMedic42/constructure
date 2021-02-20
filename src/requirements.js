import Symbol from 'es6-symbol';
import toPath from 'lodash/toPath';
import isString from 'lodash/isString';
import reduce from 'lodash/reduce';

const FIELDS = {
    requirements: Symbol('requirements'),
};

class Requirements {
    constructor(requirements) {
        this[FIELDS.requirements] = reduce(requirements, (acc, requirement) => {
            if (isString(requirement)) {
                acc.push({
                    path: ['$this'],
                    attribute: requirement,
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
