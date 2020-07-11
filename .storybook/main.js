module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.tsx?$/,
      loader: 'babel-loader',
    });
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};