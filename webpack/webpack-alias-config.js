const path = require('path');

module.exports = {
	resolve: {
		alias: {
			'@scss': path.resolve(__dirname, '../src/scss/'),
			'@blocks': path.resolve(__dirname, '../src/scss/blocks/'),
			'@utilities': path.resolve(__dirname, '../src/scss/utilities/'),
		},
	},
};
