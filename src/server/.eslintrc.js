module.exports = {
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  rules: {
    'linebreak-style': 0,
    'prettier/prettier': 2, // 1: warning, 2: error
  },
  ignorePatterns: ['node_modules/'],
};
