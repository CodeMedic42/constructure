import { isArray, isString } from 'lodash';
import toPath from 'lodash/toPath';

class VerificationError extends Error {
    constructor(message) {
        super(message);

        this.name = 'VerificationError';
        this.path = [];
    }

    static try(segment, cb) {
        try {
            return cb();
        } catch (error) {
            if ((error instanceof VerificationError)
                && (isString(segment) || isArray(segment))) {
                const segments = toPath(segment);

                if (segments.length > 0) {
                    error.path = segments.concat(error.path);
                }
            }

            throw error;
        }
    }
}

export default VerificationError;
