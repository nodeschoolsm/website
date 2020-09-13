module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:jest/recommended", "plugin:react/recommended", "standard"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["jest", "react"],
  rules: {
    quotes: ["error", "double"],
    eqeqeq: ["warn", "smart"],
    "space-before-function-paren": ["error", "never"]
  },
  settings: {
    react: {
      version: "detect"
    }
  }
}
