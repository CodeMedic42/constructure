import isNil from 'lodash/isNil';

const levels = {
    pass: 0,
    'non-fatal': 1,
    blocked: 2,
    fatal: 3,
};

function getWorstResultLevel(current, next) {
    if (isNil(current)) {
        return next;
    }

    if (isNil(next)) {
        return current;
    }

    const currentLevel = levels[current];
    const nextLevel = levels[next];

    return currentLevel < nextLevel ? next : current;
}

function getWorstResult(results) {
    let worst = results[0];

    for (let counter = 1; counter < results.length; counter += 1) {
        worst = getWorstResultLevel(worst, results[counter]);
    }

    return worst;
}

export default getWorstResult;
