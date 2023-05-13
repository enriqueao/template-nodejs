/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (async () => {
  return {
    entry: {
      index: [path.resolve(__dirname, '/src/index.ts')],
    },
    output: {
      libraryTarget: 'commonjs',
      path: path.join(__dirname, 'dist'),
      filename: 'index.js',
    },
    node: {
      __dirname: true,
    },
    stats: 'minimal',
    target: 'node',
    mode: 'development',
    externals: [nodeExternals(), 'dd-trace'],
    devtool: 'nosources-source-map',
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: [
            [
              path.resolve(__dirname, 'node_modules'),
              path.resolve(__dirname, '.webpack'),
              path.resolve(__dirname, 'dist'),
            ],
          ],
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      ],
    },
    plugins: [
      new NodemonPlugin({
        args: process.env.ARGS ? process.env.ARGS.split(', ') : '',
      }),
    ],
    resolve: {
      extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx', '.map'],
      symlinks: false,
      cacheWithContext: false,
      plugins: [
        new TsconfigPathsPlugin({
          configFile: './tsconfig.json',
        }),
      ],
    },
  };
})();
