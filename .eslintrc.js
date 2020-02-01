'use strict';

module.exports = {
  extends: ['airbnb-base'],
  rules: {
    'class-methods-use-this': 0,
    'consistent-return': 'warn',
    'function-paren-newline': 0,
    'import/no-self-import': 'warn',
    'import/prefer-default-export': 'warn',
    'no-else-return': 0,
    'no-param-reassign': ['warn', { 'props': false }],
    'no-shadow': 'warn',
    'no-underscore-dangle': 0,
    'object-curly-newline': 0,
    strict: 0,
  },
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'script',
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: [
          'node_modules',
          '.',
        ],
      },
    },
  },
};
