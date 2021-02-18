const Symbol = require("es6-symbol");

const FIELDS = {
    message: Symbol('message'),
    fatal: Symbol('fatal'),
}

class Result {
    constructor(message, fatal) {
        this[FIELDS.message] = message;
        this[FIELDS.fatal] = fatal;
    }

    isFatal() {
        return this[FIELDS.fatal];
    }

    getMessage() {
        return this[FIELDS.message];
    }
}

module.exports = Result;