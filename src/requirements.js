import Symbol from 'es6-symbol';
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
                    path: null,
                    attribute: requirement,
                });
            } else {
                acc.push(requirement);
            }

            return acc;
        }, []);
    }

    get() {
        return this[FIELDS.requirements];
    }
}

export default Requirements;
