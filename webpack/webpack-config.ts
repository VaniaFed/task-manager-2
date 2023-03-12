import { resolve } from 'path';

const defaultConfig = {
	entry: resolve(__dirname, '../', 'src', 'index.ts'),
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: ['ts-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.webpack.js', '.js', '.jsx', '.ts', '.tsx', '.json', '.sass', '.scss', '.css'],
	},
};

export default defaultConfig;
