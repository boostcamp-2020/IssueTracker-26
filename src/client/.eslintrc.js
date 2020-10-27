const OS = require('os');

module.exports = {
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended', 'plugin:react/recommended',],
  rules: {
    'linebreak-style': ['error', OS.EOL === '\r\n' ? 'windows' : 'unix'],
    'prettier/prettier': ['error', { endOfLine: 'auto'} ],
  },
  ignorePatterns: ['node_modules/'],
};

