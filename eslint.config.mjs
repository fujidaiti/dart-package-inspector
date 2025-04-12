import js from "@eslint/js";
import globals from "globals";
import path from "path";
import * as tseslint from "typescript-eslint";
import { fileURLToPath } from "url";

// Helper for directory paths
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create typescript-eslint recommended configs properly
const tsConfig = tseslint.config(
  tseslint.configs.recommended
);

export default [
  // Base JavaScript rules
  js.configs.recommended,
  
  // Files to ignore - similar to .eslintignore
  {
    ignores: [
      "dist/",
      "lib/",
      "node_modules/",
      "jest.config.js",
      "__tests__/",
      "eslint.config.mjs"
    ]
  },

  // Use TypeScript ESLint's recommended configs
  ...tsConfig,

  // TypeScript-specific override configuration
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
        ecmaVersion: 2022,
        sourceType: "module"
      },
      globals: {
        ...globals.node
      }
    },
    // Note: The plugin is imported automatically via tsConfig
    rules: {
      // Custom rules or overrides of typescript-eslint recommendations
      "@typescript-eslint/explicit-member-accessibility": ["error", { "accessibility": "no-public" }],
      "@typescript-eslint/explicit-function-return-type": ["error", { "allowExpressions": true }],
      // Use semicolons rule directly from js instead of typescript-eslint
      "semi": ["error", "never"],
      
      // Disable rules that would have been turned off in GitHub plugin
      "i18n-text/no-en": "off",
      "eslint-comments/no-use": "off",
      "import/no-namespace": "off",
      "camelcase": "off"
    }
  },

  // Test files
  {
    files: ["**/__tests__/**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    },
    rules: {
      // Any test-specific rules can go here
    }
  }
]; 