const {resolve} = require('path');
const {IgnorePlugin} = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  context: resolve(process.cwd()),
  entry: './src/index.tsx',
  watch: true,

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.css'],
    alias: {
      '@ant-design/icons/dist$': resolve(process.cwd(), 'src/icons.ts')
    }
  },

  output: {
    filename: 'output.js'
  },

  devServer: {
    // Serve index.html as the base
    contentBase: resolve(process.cwd(), 'public'),

    // Enable compression
    compress: true,

    // Enable hot reloading
    hot: true,

    port: 3000,

    // Public path is root of content base
    publicPath: '/',
  },

  plugins: [
    new IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      inject: true,
      template: resolve(process.cwd(), 'public/index.html'),
    })
  ],

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-maps-loader'
      },
      {
        test: /\.less$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              camelCase: true
            }
          }
        ]
      }
    ]
  }
};
