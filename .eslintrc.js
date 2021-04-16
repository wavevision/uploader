module.exports = {
  extends: [
    '@wavevision/coding-standard/ts/eslint',
    '@wavevision/coding-standard/ts/eslint/react',
    '@wavevision/coding-standard/ts/eslint/jest',
  ].map(require.resolve),
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: '.',
  },
};
