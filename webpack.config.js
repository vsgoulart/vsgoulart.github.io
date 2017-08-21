#!/usr/bin/env node
"use strict";

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extensions = [".js", ".jsx", ".css", ".scss", ".json"];
let publicPath = "";
let plugins = [
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: ["vendor", "manifest"]
  }),
  new HtmlWebpackPlugin({
    template: "src/index.html",
    chunksSortMode: "dependency"
  }),
  new ExtractTextPlugin({
    filename: "style.[contenthash].css",
    allChunks: true
  })
];

module.exports = (env = {}) => {
  if (env.prod) {
    publicPath = "/dist/";
  }
  return {
    entry: {
      bundle: "./src/index.js"
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].[chunkhash].js",
      publicPath
    },
    module: {
      rules: [
        {
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "postcss-loader"]
          }),
          test: /\.s?css$/
        }
      ]
    },
    resolve: {
      extensions
    },
    plugins
  };
};
