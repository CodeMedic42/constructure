import Promise from 'bluebird';
import reduce from 'lodash/reduce';
import getWorstResultLevel from './get-worst-level';

export default function combineResults(resultStatuses) {
    return Promise.all(resultStatuses)
        .then((results) => reduce(
            results,
            (acc, result) => getWorstResultLevel(acc, result),
            null,
        ));
}
