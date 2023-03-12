import HtmlWebpackPlugin from 'html-webpack-plugin';
import { SourceMapDevToolPlugin } from 'webpack';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const devConfig = {
	target: 'web',
	devtool: false,
	module: {
		rules: [
			{
				test: /\.scss$/i,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [['postcss-preset-env']],
							},
						},
					},
					'sass-loader',
				],
			},
			{
				test: /\.(jpe?g|png|webp|gif|svg)$/i,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new SourceMapDevToolPlugin({}),
		new HtmlWebpackPlugin({
			template: resolve(__dirname, '../', 'src/', 'index.html'),
			filename: 'index.html',
		}),
	],
	mode: 'development',
};

export default devConfig;
