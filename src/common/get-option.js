import isNil from 'lodash/isNil';

export default function getOption(optionId, options, globalOptions) {
    const globalOption = globalOptions[optionId];
    const option = options[optionId];

    return !isNil(option) ? option : globalOption;
}
