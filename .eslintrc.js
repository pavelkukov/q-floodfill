module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        semi: 'off',
        'prettier/prettier': ['error', { semi: false, singleQuote: true }],
        '@typescript-eslint/semi': ['error', 'never'],
    },
}
