import js from "@eslint/js";
import cypress from "cypress";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    files: ["src/**/*.js", "cypress/**/*.js"],
    rules: {
      "no-unused-vars": "error",
      "no-undef": "off",
    },
    plugins: {
      cypress: cypress,
    },
    // ignores: ["**/node_modules/**", "dist/**", "**/build/**"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
];
