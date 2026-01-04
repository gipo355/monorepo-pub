import { Config, defineConfig } from 'eslint/config';

import pluginQuery from '@tanstack/eslint-plugin-query';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import reactPlugin from 'eslint-plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler';
import globals from 'globals';

const configs: Record<string, Config[]> = {
  recommended: defineConfig(
    {
      settings: {
        'import-x/resolver-next': [
          createTypeScriptImportResolver({
            alwaysTryTypes: true, // Always try to resolve types under `<root>@types` directory even if it doesn't contain any source code, like `@types/unist`
            project: './tsconfig.eslint.json',
          }),
        ],
      },
      languageOptions: {
        parserOptions: {
          // astro-eslint-parser doesn't support projectService, use project instead
          project: './tsconfig.json',
          tsconfigRootDir: import.meta.dirname,
        },
        globals: {
          ...globals.browser,
          ...globals.serviceworker,
        },
      },
    },

    {
      files: ['**/*.{ts,tsx,mtsx,js,jsx,mdx,mjsx}'],

      settings: {
        'import/resolver': {
          project: ['tsconfig.*?.json'],
        },
        react: {
          version: 'detect',
        },
      },
      // languageOptions: {
      //     parserOptions: {
      //         project: ["tsconfig.*?.json"],
      //         tsconfigRootDir: __dirname,
      //     },
      //     // ...reactPlugin.languageOptions,
      //     // ...jsxA11y.flatConfigs.recommended.languageOptions,
      //     globals: {
      //         ...globals.browser,
      //         ...globals.serviceworker,
      //     },
      // },

      // ...reactPlugin.languageOptions,
      // ...jsxA11y.flatConfigs.recommended.languageOptions,

      // in nx/react
      // ...jsxA11y.flatConfigs.recommended,

      extends: [
        reactPlugin.configs.flat.recommended,
        reactPlugin.configs.flat['jsx-runtime'],
        reactCompiler.configs.recommended,
        ...pluginQuery.configs['flat/recommended'],
      ],
      rules: {
        // react hooks (in nx/react)
        // ...reactHooksPlugin.configs.recommended.rules,

        // react refresh
        'react-refresh/only-export-components': 'warn',

        'react-compiler/react-compiler': 'error',

        // base config react plugin
        // from https://timjames.dev/blog/the-best-eslint-rules-for-react-projects-30i8
        'react/prefer-stateless-function': 'error',
        'react/sort-comp': 'error',
        'react/button-has-type': 'error',
        'react/no-unused-prop-types': 'error',
        'react/jsx-pascal-case': 'error',
        'react/jsx-no-script-url': 'error',
        'react/no-children-prop': 'error',
        'react/no-danger': 'error',
        'react/no-danger-with-children': 'error',
        'react/no-unstable-nested-components': [
          'error',
          { allowAsProps: true },
        ],
        'react/jsx-fragments': 'error',
        'react/destructuring-assignment': [
          'error',
          'always',
          { destructureInSignature: 'always' },
        ],
        'react/jsx-no-leaked-render': [
          'error',
          { validStrategies: ['ternary'] },
        ],
        'react/jsx-max-depth': ['error', { max: 5 }],
        'react/function-component-definition': [
          'warn',
          { namedComponents: 'arrow-function' },
        ],
        'react/jsx-key': [
          'error',
          {
            checkFragmentShorthand: true,
            checkKeyMustBeforeSpread: true,
            warnOnDuplicates: true,
          },
        ],
        'react/jsx-no-useless-fragment': 'warn',
        'react/jsx-curly-brace-presence': 'warn',
        'react/no-typos': 'warn',
        'react/display-name': 'warn',
        'react/self-closing-comp': 'warn',
        'react/jsx-sort-props': 'warn',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/prop-types': 'off',

        // jsdoc
        'jsdoc/require-throws': 'error',
        'jsdoc/check-indentation': 'warn',
        'jsdoc/no-blank-blocks': 'warn',
        'jsdoc/require-asterisk-prefix': 'warn',
        'jsdoc/require-description': 'warn',
        'jsdoc/sort-tags': 'warn',
        'jsdoc/check-syntax': 'warn',
        'jsdoc/tag-lines': ['warn', 'never', { startLines: 1 }],
        'jsdoc/require-param': ['warn', { checkDestructuredRoots: false }],
        'jsdoc/require-jsdoc': [
          'warn',
          {
            publicOnly: true,
            require: {
              FunctionDeclaration: true,
              FunctionExpression: true,
              ArrowFunctionExpression: true,
              ClassDeclaration: true,
              ClassExpression: true,
              MethodDefinition: true,
            },
            contexts: [
              'VariableDeclaration',
              'TSTypeAliasDeclaration',
              // Encourage documenting React prop types
              'TSPropertySignature',
            ],
            enableFixer: true,
          },
        ],
        // tsdoc checks this syntax instead
        'jsdoc/require-hyphen-before-param-description': 'off',
        'jsdoc/require-returns': 'off',
        'unicorn/filename-case': 'off',

        // arrow funcs
        'arrow-body-style': 'warn',
        'prefer-arrow-callback': [
          'warn',
          {
            allowNamedFunctions: true,
          },
        ],
      },
    },
  ),
};

export default configs;
