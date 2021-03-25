import isNil from 'lodash/isNil';
import isBoolean from 'lodash/isBoolean';
import Structure from './structure';
import typeVerify from '../common/type-verify';
import getOption from '../common/get-option';

function verifier(options, runtime, value) {
    const allowNull = getOption('allowNull', options, runtime.getOptions());

    return typeVerify(value, allowNull, isBoolean, 'Must be a boolean');
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
