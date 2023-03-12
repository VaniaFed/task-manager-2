import { resolve } from 'path';

const aliasConfig = {
	resolve: {
		alias: {
			'@scss': resolve(__dirname, '../src/scss/'),
			'@blocks': resolve(__dirname, '../src/blocks/'),
			'@services': resolve(__dirname, '../src/services/'),
			'@utilities': resolve(__dirname, '../src/utilities/'),
		},
	},
};

export default aliasConfig;
