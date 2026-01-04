import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { configs as astroConfigs } from 'eslint-plugin-astro';
import globals from 'globals';
import { Config, defineConfig } from 'eslint/config';

const configs: Record<string, Config[]> = {
  recommended: defineConfig(
    {
      files: ['**/*.astro'],
      extends: [
        ...astroConfigs.recommended,
        ...astroConfigs['jsx-a11y-recommended'],
      ],
      languageOptions: {
        parserOptions: {
          // astro-eslint-parser doesn't support projectService, use project instead
          project: './tsconfig.json',
          tsconfigRootDir: import.meta.dirname,
        },
      },
      rules: {},
    },

    {
      files: ['**/*.{ts,tsx,js,jsx,mts,cts,mjs,cjs}'],
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
        },
        globals: {
          ...globals.node,
          ...globals.browser,
          ...globals.serviceworker,
        },
      },
      rules: {
        'unicorn/prefer-global-this': 'off',
      },
    },

    {
      settings: {
        'import-x/resolver-next': [
          createTypeScriptImportResolver({
            alwaysTryTypes: true, // Always try to resolve types under `<root>@types` directory even if it doesn't contain any source code, like `@types/unist`
            project: './tsconfig.eslint.json',
          }),
        ],
      },
    },
  ),
};

export default configs;
