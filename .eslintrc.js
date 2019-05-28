module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
        project: './tsconfig.json',
        ecmaVersion: 2018,
        sourceType: 'module'
    },

    plugins: ['@typescript-eslint'],

    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/essential',
        '@vue/standard',
        '@vue/typescript'
    ],

    rules: {
        'indent': ['error', 4, {
            // 0 would be nicer but somehow eslint is not working with that
            SwitchCase: 1
        }],
        'brace-style': ['error', 'stroustrup', {
            allowSingleLine: true
        }],
        'space-before-blocks': ['error', {
            functions: 'never',
            keywords: 'always',
            classes: 'always'
        }],
        'space-before-function-paren': ['error', {
            anonymous: 'never',
            named: 'never',
            asyncArrow: 'always'
        }],
        'no-multiple-empty-lines': ['error', {
            max: 3,
            maxEOF: 3, // due to vue sfc
            maxBOF: 0
        }],
        'no-multi-spaces': ['error', {
            exceptions: {
                VariableDeclarator: true,
                ImportDeclaration: true
            }
        }],
        'comma-dangle': ['error', 'always-multiline'],
        'key-spacing': ['error', {
            mode: 'minimum'
        }],
        'space-in-brackets': ['error', 'never'],
        'object-curly-spacing': ['off'],
        'space-in-brackets': ['off'],
        'object-property-newline': ['error', {
            allowAllPropertiesOnSameLine: true,
        }],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/array-type': 'off',
        // arghs those python developer
        'camelcase': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/member-delimiter-style': ['error', {
            multiline: {delimiter: 'none'},
            singleline: {delimiter: 'comma'}
        }],
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },

    overrides: [
        {
            files: ['*.js', '*.jsx'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off'
            }
        }
    ]
}
