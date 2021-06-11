module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['eslint-plugin-import-helpers'],
  rules: {
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          '/^r/',
          'module',
          [
            '/^@assets/',
            '/^@components/',
            '/^@contexts/',
            '/^@hooks/',
            '/^@pages/',
            '/^@utils/',
          ],
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: {order: 'asc', ignoreCase: true},
      },
    ],
  },
};
