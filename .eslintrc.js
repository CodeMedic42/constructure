module.exports = {
    env: {
        browser: true,
        es2021: true,
        mocha: true,
    },
    extends: [
        'airbnb-base',
    ],
    plugins: ['react/recommended'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        ecmaFeatures: {
            // globalReturn: true,
            // impliedStrict: true,
            jsx: true,
            // arrowFunction: true,
        },
    },
    rules: {
        indent: ['error', 4],
        'arrow-body-style': 0,
        'import/no-unresolved': ['error', { ignore: ['react', 'constructure'] }],
    },
    overrides: [
        {
            files: ['*.test.js', '*.spec.js'],
            rules: {
                'no-unused-expressions': 'off',
            },
        },
    ],
};
