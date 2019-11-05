module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2017,
  },
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    "eslint:recommended",
    'prettier',
  ],
  globals: {
    __DEV__: true,
  },
  plugins: ['prettier', 'prefer-arrow'],
  root: true,
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'],
      },
    },
  },
  rules: {
    // eslint official
    'newline-before-return': 'error',
    'no-console': 'warn',
    'require-yield': 'error',
    'no-unused-vars': 'warn',

    // prefer-arrow
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: true,
        classPropertiesAllowed: false,
      },
    ],

    // import
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
      },
    ],
    'import/prefer-default-export': 'off',

    // prettier
    'prettier/prettier': [
      'error',
      {
        bracketSpacing: true,
        printWidth: 80,
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
        useTabs: false,
      },
    ],
  },
}
