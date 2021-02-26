class VerificationError extends Error {
    constructor(message, path) {
        super(message);

        this.name = 'VerificationError';
        this.path = path;
    }
}

export default VerificationError;
