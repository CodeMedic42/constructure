import isNil from 'lodash/isNil';
import isFinite from 'lodash/isFinite';
import Structure from './structure';
import typeVerify from '../common/type-verify';
import getOption from '../common/get-option';

function verifier(options, runtime, value) {
    const allowNull = getOption('allowNull', options, runtime.getOptions());

    return typeVerify(value, allowNull, isFinite, 'Must be a real number');
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
