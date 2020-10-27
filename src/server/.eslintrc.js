module.exports = {
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  rules: {
    'linebreak-style': ['error', require('os').EOL === '\r\n' ? 'windows' : 'unix'],
    'prettier/prettier': ['error', { endOfLine: 'auto'} ],
  },
  ignorePatterns: ['node_modules/'],
};

