const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const translateEnvToMode = (env) => {
  if (env === "production") {
    return "production";
  }
  return "development";
};

module.exports = env => {
  return {
    target: "electron-renderer",
    mode: translateEnvToMode(env),
    node: {
      __dirname: false,
      __filename: false
    },
    externals: [nodeExternals()],
    resolve: {
      alias: {
        env: path.resolve(__dirname, `../config/env_${env}.json`)
      }
    },
    devtool: "source-map",
    module: {
      rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: 'babel-loader'
        }, {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          loader: 'url-loader'
        }
      ]
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin({
        clearConsole: env === "development"
      }),
      new webpack.ProvidePlugin({
        L: 'leaflet'
      })
    ]
  };
};
