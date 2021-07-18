module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "airbnb-base", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ["prettier"],
  rules: {
    "no-console": 0,
    "prettier/prettier": "error",
  },
  overrides: [
    {
      files: ["**/*.test.js"],
      extends: ["plugin:jest/recommended", "plugin:jest/style"],
    },
  ],
};
