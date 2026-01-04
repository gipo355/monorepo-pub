import { Config, defineConfig } from 'eslint/config';
// @ts-expect-error - no type declarations available
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import json from '@eslint/json';
import eslintPluginImportX from 'eslint-plugin-import-x';
import jsdoc from 'eslint-plugin-jsdoc';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import jsoncParser from 'jsonc-eslint-parser';
import { configs as tseslintConfigs } from 'typescript-eslint';
// import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";

const configs: Record<string, Config[]> = {
  recommended: defineConfig(
    {
      // ignores in its own block will ignore files
      // ignore in a block with files prevents rule from applying to those files
      ignores: [
        '**/dist',
        '**/.react-router',
        '**/vite.config.*.timestamp*',
        '**/vitest.config.*.timestamp*',
        '**/node_modules',
        '**/*.generated.ts',
        '**/*.gen.ts',
        'polyfills.ts',
        '**/.storybook',
        'package-lock.json',
        '**/.cache',
        '**/.yarn',
        '**/.pnpm-store',
        '**/build',
        '**/coverage',
        '**/.next',
        '**/out',
        '**/.nuxt',
        '**/.cache',
        '**/public',
        'pnpm-lock.yaml',
      ],
    },

    {
      files: [
        '**/*.ts',
        '**/*.tsx',
        '**/*.cts',
        '**/*.mts',
        '**/*.js',
        '**/*.jsx',
        '**/*.cjs',
        '**/*.mjs',
      ],
      extends: [
        eslintPluginImportX.flatConfigs.recommended,
        jsdoc.configs['flat/recommended-typescript'],
        comments.recommended,
        eslintPluginUnicorn.configs.recommended,
      ],
      plugins: {
        // "simple-import-sort": eslintPluginSimpleImportSort,
      },
      rules: {
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/no-null': 'off', // null can have a meaning, but can be misused https://github.com/sindresorhus/meta/discussions/7
        'unicorn/prefer-top-level-await': 'off',

        // "sort-imports": "off", // conflicts with simple-import-sort
        // prettier plugin imports instead
        // "simple-import-sort/imports": "off",
        // "simple-import-sort/exports": "off",

        'import-x/first': 'error',
        'import-x/order': 'off',
        'import-x/newline-after-import': 'error', // makes sure that imports are separated by new lines
        'import-x/no-duplicates': 'error',
        'import-x/no-unresolved': 'off',

        '@eslint-community/eslint-comments/require-description': [
          'error',
          { ignore: [] },
        ],

        'max-params': ['error', 3], // enforces limiting the number of parameters in functions: prefer passing typed objects as parameters to provide intellisense
        'no-nested-ternary': 'error', // bad for readability
        'no-implicit-coercion': 'error', // This rule disallows shorthand type conversions for boolean, numbers and strings. bad for readability
        'no-console': 'warn',
        'no-magic-numbers': 'warn', // prevent magic numbers, use constants which provide a meaningful name
        'no-loss-of-precision': 'warn',
        complexity: ['error', 20],
        'prefer-const': 'error',
        eqeqeq: 'error',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

        // ! ASYNC RULES, FROM https://maximorlov.com/linting-rules-for-asynchronous-code-in-javascript/
        // check also parallelism in loops at https://maximorlov.com/parallel-tasks-with-pure-javascript/
        'no-async-promise-executor': 'warn', // This rule disallows passing an async function to the new Promise constructor.
        'no-await-in-loop': 'error', // This rule disallows using await inside loops.
        'no-promise-executor-return': 'warn', // This rule disallows returning a value inside a Promise constructor.
        'require-atomic-updates': 'warn', // This rule disallows assignments in combination with await, which can lead to race conditions.
        'max-nested-callbacks': ['warn', 3], // This rule enforces a maximum nesting depth for callbacks. In other words, this rule prevents callback hell
        'no-return-await': 'error', // This rule disallows unnecessary return await.
        'prefer-promise-reject-errors': 'warn', // This rule enforces using an Error object when rejecting a Promise.

        // side effects and mutations (immutable and pure plugins)
        'no-var': 2,
        'no-void': [1, { allowAsStatement: true }],
        'no-undef': 'warn',
        'no-restricted-syntax': [
          'error',
          'ForInStatement',
          'LabeledStatement',
          'WithStatement',
        ],
      },
    },

    {
      files: ['**/*.ts', '**/*.tsx', '**/*.cts'],
      extends: [
        eslintPluginImportX.flatConfigs.typescript,
        tseslintConfigs.eslintRecommended,
        ...tseslintConfigs.strictTypeChecked, // best
        ...tseslintConfigs.stylisticTypeChecked, // best
      ],
      rules: {
        // "@typescript-eslint/explicit-module-boundary-types": ["error"], // enforces providing explicit return type for functions: prevent slow types in the future
        '@typescript-eslint/consistent-type-exports': 'error',
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/ban-ts-comment': 'warn',
      },
    },

    {
      files: ['**/*.d.ts'],
      rules: {
        // Disable problematic rules for declaration files
        '@typescript-eslint/unified-signatures': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },

    {
      files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.spec.js', '**/*.spec.jsx'],
      languageOptions: {
        globals: {
          ...globals.vitest,
          ...globals.jest,
        },
      },
      rules: {},
    },

    // {
    //   files: ['**/*.ts', '**/*.js'],
    //   rules: {
    //     '@nx/enforce-module-boundaries': [
    //       'error',
    //       {
    //         enforceBuildableLibDependency: true,
    //         allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
    //         depConstraints: [
    //           {
    //             sourceTag: 'scope:shared',
    //             onlyDependOnLibsWithTags: ['scope:shared'],
    //           },
    //           {
    //             sourceTag: 'scope:eslint',
    //             onlyDependOnLibsWithTags: ['scope:shared', 'scope:eslint'],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
    // {
    //   files: ['**/package.json'],
    //   languageOptions: {
    //     parser: jsoncParser,
    //   },
    //   rules: {
    //     '@nx/dependency-checks': [
    //       'error',
    //       {
    //         ignoredFiles: [
    //           '{projectRoot}/eslint.config.{js,cjs,mjs}',
    //           '{projectRoot}/rollup.config.{js,ts,mjs,mts,cjs,cts}',
    //           '{projectRoot}/vite.config.{js,ts,mjs,mts}',
    //         ],
    //       },
    //     ],
    //   },
    // },

    {
      files: ['**/*.json'],
      language: 'json/json',
      ...json.configs.recommended,
      languageOptions: {
        parser: jsoncParser,
      },
    },
  ),
};

export default configs;
