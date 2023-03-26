module.exports = {
	env: {
		browser: true,
		es2022: true,
	},
	extends: ['eslint:recommended', 'airbnb', 'standard-with-typescript', 'prettier', 'plugin:prettier/recommended'],
	plugins: ['prettier'],
	parser: 'babel-eslint',
	parserOptions: {
		requireConfigFile: false,
		babelOptions: {
			babelrc: false,
			configFile: false,
			presets: ['@babel/preset-env'],
		},
	},
	rules: {
		'capitalized-comments': 0,
		'no-negated-condition': 0,
		'arrow-parens': 0,
		'no-param-reassign': [2, { props: false }],
		'no-use-before-define': 2,
		'linebreak-style': 0,
		quotes: ['error', 'single'],
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'implicit-arrow-linebreak': 2,
		'consistent-return': 0,
		'no-console': 0,
		'global-require': 0,
		'prettier/prettier': 0,
		'import/no-extraneous-dependencies': 0,
		'import/prefer-default-export': 0,
		'import/no-cycle': 0,
		'no-underscore-dangle': 0,
	},
	settings: {
		'import/resolver': {
			alias: {
				map: [
					['scss', './src/scss'],
					['blocks', './src/blocks'],
					['services', './src/services'],
					['utils', './src/utils'],
					['helpers', './src/helpers'],
					['types', './src/types'],
				],
				extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss'],
			},
		},
	},
};
