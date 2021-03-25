import { isUndefined } from 'lodash';
import Structure from './structure';
import typeVerify from '../common/type-verify';
import getOption from '../common/get-option';

function verifier(options, runtime, value) {
    const allowNull = getOption('allowNull', options, runtime.getOptions());

    return typeVerify(value, allowNull, isUndefined, 'Must not exist');
}

export default (exactType) => new Structure(verifier.bind(null, exactType));
