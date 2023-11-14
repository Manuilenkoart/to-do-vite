module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'simple-import-sort'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
  },
  ignorePatterns: ['vite.config.ts'],
};
