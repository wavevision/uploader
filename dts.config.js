// @ts-check

/** @type import('dts-bundle-generator/config-schema').BundlerConfig */
const config = {
  compilationOptions: {
    followSymlinks: false,
    preferredConfigPath: './tsconfig.dts.json',
  },
  entries: [
    {
      noCheck: true,
      filePath: './src/index.ts',
      libraries: {
        importedLibraries: ['react'],
      },
      outFile: './dist/index.d.ts',
      output: {
        umdModuleName: 'WavevisionUploader',
      },
    },
  ],
};

module.exports = config;
