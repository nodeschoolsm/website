module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true
  },
  extends: ["plugin:react/recommended", "standard"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["react", "jest"],
  rules: {
    quotes: ["error", "double"],
    eqeqeq: ["warn", "smart"],
    "space-before-function-paren": ["error", "never"],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": [1]
  },
  settings: {
    react: {
      version: "detect"
    }
  }
}
