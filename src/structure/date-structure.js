import isNil from 'lodash/isNil';
import isDate from 'lodash/isDate';
import Structure from './structure';
import typeVerify from '../common/type-verify';
import getOption from '../common/get-option';

function verifier(options, runtime, value) {
    const allowNull = getOption('allowNull', options, runtime.getOptions());

    return typeVerify(value, allowNull, isDate, 'Must be a Date object');
}

export default (options) => {
    let allowNull = null;

    if (!isNil(options)) {
        ({
            allowNull = allowNull,
        } = options);
    }

    return new Structure(verifier.bind(this, {
        allowNull,
    }));
};
