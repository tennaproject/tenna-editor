import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';

import googleConfig from 'eslint-config-google';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config([
  {
    ignores: ['dist'],
  },

  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      googleConfig,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      prettierConfig,
    ],

    plugins: {
      react: eslintPluginReact,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': eslintPluginJsxA11y,
    },

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      'valid-jsdoc': 'off',
    },
  },
]);
