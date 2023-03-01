const path = require('path');

module.exports = {
	resolve: {
		alias: {
			'@js': path.resolve(__dirname, '../src/js/'),
			'@scss': path.resolve(__dirname, '../src/scss/'),
			'@blocks': path.resolve(__dirname, '../src/blocks/'),
			'@utilities': path.resolve(__dirname, '../src/utilities/'),
		},
	},
};
