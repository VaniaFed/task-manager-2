const path = require('path');

const mode = process.env.NODE_ENV || 'development';

const devMod = mode === 'development';

const target = devMod ? 'web' : 'browserslist';
const devtool = devMod ? 'source-map' : undefined;

module.exports = {
	mode,
	target,
	devtool,
	entry: path.resolve(__dirname, 'src', 'index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		filename: 'index.[contenthash].js',
	},
};
