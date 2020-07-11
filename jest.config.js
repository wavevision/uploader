/* eslint @typescript-eslint/no-var-requires: 'off' */
const babelConfig = require('./babel.config');
const tsConfig = require('./tsconfig.json');

module.exports = {
  cacheDirectory: '<rootDir>/temp/cache/jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['<rootDir>/src/**/tests/**/*.test.ts?(x)'],
  testPathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/temp/',
    '<rootDir>/tests/',
  ],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(s?css)$': '<rootDir>/node_modules/jest-css-modules',
  },
  coverageDirectory: '<rootDir>/temp/coverage',
  coverageReporters: ['html', 'text'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!dist/**',
    '!src/**/stories/**',
    '!src/**/tests/**',
    '!src/index.ts',
  ],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      babelConfig,
      isolatedModules: true,
      tsConfig: tsConfig.compilerOptions,
    },
  },
};
