import js from "@eslint/js";
import tseslint from "typescript-eslint";

// Shared flat ESLint config. Apps can extend this when they need platform rules.
export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      "**/dist/**",
      "**/build/**",
      "**/.turbo/**",
      "**/node_modules/**",
      "apps/weapp/dist/**"
    ]
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/consistent-type-imports": "warn"
    }
  }
);
