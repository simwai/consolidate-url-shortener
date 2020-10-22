module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    "plugin:json/recommended"
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'prefer-const': ['error', {
      destructuring: 'any',
      ignoreReadBeforeAssign: false
    }],
    'no-var': 'error'
  }
}
