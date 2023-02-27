const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const path = require('path');

module.exports = {
	output: {
		path: path.resolve(__dirname, '../dist'),
		clean: true,
		filename: 'index.js',
		assetModuleFilename: 'assets/[name][ext]',
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkFilename: '[id].[chunkhash].css',
		}),
		// new ESLintPlugin(),
		// new StylelintPlugin(),
	],
};
