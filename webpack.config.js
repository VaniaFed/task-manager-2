const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

const devMode = mode === 'development';

const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
	mode,
	target,
	devtool,
	devServer: {
		port: 3000,
		open: true,
		hot: true,
	},
	entry: ['@babel/polyfill', path.resolve(__dirname, 'src', 'index.js')],
	output: {
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		filename: 'index.[contenthash].js',
		assetModuleFilename: 'assets/[name][ext]',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'index.html'),
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		new ESLintPlugin(),
		new StylelintPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
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
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [['@babel/preset-env', { targets: 'defaults' }]],
					},
				},
			},
			{
				test: /\.(jpe?g|png|webp|gif|svg)$/i,
				use: devMode
					? []
					: [
							{
								loader: 'image-webpack-loader',
								options: {
									mozjpeg: {
										progressive: true,
									},
									optipng: {
										enabled: false,
									},
									pngquant: {
										quality: [0.65, 0.9],
										speed: 4,
									},
									gifsicle: {
										interlaced: false,
									},
									webp: {
										quality: 75,
									},
								},
							},
					  ],
				type: 'asset/resource',
			},
		],
	},
	resolve: {
		alias: {
			'@scss': path.resolve(__dirname, './src/scss/'),
			'@blocks': path.resolve(__dirname, './src/scss/blocks/'),
			'@utilities': path.resolve(__dirname, './src/scss/utilities/'),
		},
	},
};
