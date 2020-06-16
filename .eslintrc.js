module.exports = {
  extends: require.resolve('@wavevision/coding-standard/ts/eslint/react'),
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: '.',
  },
};
