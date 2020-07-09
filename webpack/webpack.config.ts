import { resolve } from 'path';

import deepmerge from 'deepmerge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { Configuration, ProgressPlugin, optimize } from 'webpack';

const merge = (left: Configuration, right: Configuration): Configuration =>
  deepmerge(left, right, {
    arrayMerge: (target, source) => [...source, ...target],
  });

const resolveExternal = (name: string): string =>
  resolve(__dirname, '..', 'node_modules', name);

const config: Configuration = {
  mode: 'production',
  devtool: 'source-map',
  target: 'web',
  entry: {
    index: resolve(__dirname, '..', 'src', 'index.ts'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitError: true,
          emitWarning: false,
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['cache-loader', 'babel-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCssAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
      new TerserPlugin({
        extractComments: false,
        sourceMap: true,
        terserOptions: {
          mangle: true,
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'style.css' }),
    new optimize.OccurrenceOrderPlugin(true),
    new ProgressPlugin(),
  ],
  output: {
    library: 'WavevisionUploader',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: resolve(__dirname, '..', 'dist'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  stats: 'minimal',
};

export default [
  merge(config, {
    name: 'index',
    output: {
      filename: 'index.js',
    },
    externals: {
      '@wavevision/class-name': {
        commonjs: '@wavevision/class-name',
        commonjs2: '@wavevison/class-name',
      },
      '@wavevision/ts-utils': {
        commonjs: '@wavevision/ts-utils',
        commonjs2: '@wavevision/ts-utils',
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'ReactDOM',
        root: 'ReactDOM',
      },
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'React',
        root: 'React',
      },
    },
    resolve: {
      alias: {
        '@wavevision/class-name': resolveExternal('@wavevision/class-name'),
        '@wavevision/ts-utils': resolveExternal('@wavevision/ts-utils'),
        'react-dom': resolveExternal('react-dom'),
        react: resolveExternal('react'),
      },
    },
  }),
  merge(config, {
    name: 'all',
    output: {
      filename: 'all.js',
    },
  }),
];
