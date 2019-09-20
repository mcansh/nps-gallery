module.exports = {
  extends: ['mcansh/typescript', 'plugin:import/typescript'],
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {},
      typescript: {},
    },
  },
  rules: {
    'import/order': ['error', { 'newlines-between': 'always' }],
    'react/prop-types': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '__tests__/**/*',
          'test-utils/index.tsx',
          'types/jest-dom.d.ts',
          'prettier.config.js',
        ],
      },
    ],
  },
};
