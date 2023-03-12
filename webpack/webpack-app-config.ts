import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';

import { resolve } from 'path';

const appConfig = {
	output: {
		path: resolve(__dirname, '../dist'),
		clean: true,
		filename: 'index.js',
		assetModuleFilename: 'assets/[name][ext]',
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkFilename: '[id].[chunkhash].css',
		}),
		new ESLintPlugin(),
		new StylelintPlugin(),
	],
};

export default appConfig;
