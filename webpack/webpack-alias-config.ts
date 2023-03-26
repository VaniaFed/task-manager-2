import { resolve } from 'path';

const aliasConfig = {
	resolve: {
		alias: {
			scss: resolve(__dirname, '../src/scss/'),
			blocks: resolve(__dirname, '../src/blocks/'),
			services: resolve(__dirname, '../src/services/'),
			utils: resolve(__dirname, '../src/utils/'),
			helpers: resolve(__dirname, '../src/helpers/'),
			types: resolve(__dirname, '../src/types/'),
		},
	},
};

export default aliasConfig;
