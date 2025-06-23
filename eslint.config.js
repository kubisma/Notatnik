const { defineConfig } = require("eslint/config");
const expo = require("eslint-config-expo/flat");
const prettierPlugin = require("eslint-plugin-prettier");

module.exports = defineConfig([
  expo,

  {
    name: "prettier",
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },

  {
    ignores: ["**/dist/**", "**/node_modules/**"],
  },
]);
