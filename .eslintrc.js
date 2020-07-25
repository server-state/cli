module.exports = {
  extends: [
    'eslint:recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'script',
  },
  env: {
    node: true,
    es6: true,
  },
  ignorePatterns: [
    "./fem-test-environment",
  ],
};
