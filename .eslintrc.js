module.exports = {
    env: {
        browser: true,
        mocha: true,
    },
    parser: '@babel/eslint-parser',
    extends: [
        'airbnb',
    ],
    plugins: ['react'],
    parserOptions: {
        ecmaVersion: 9,
        sourceType: 'module',
        allowImportExportEverywhere: false,
        codeFrame: false,
        ecmaFeatures: {
            globalReturn: true,
            impliedStrict: true,
            jsx: true,
            arrowFunction: true,
        },
    },
    rules: {
        indent: ['error', 4],
        'arrow-body-style': 0,
        'import/no-unresolved': ['error', { ignore: ['react', 'constructure'] }],
        'react/jsx-indent': ['error', 4],
    },
    overrides: [
        {
            files: ['*.test.js', '*.spec.js'],
            rules: {
                'no-unused-expressions': 'off',
            },
        },
    ],
    settings: {
        react: {
            version: '17.0',
        },
    },
};
