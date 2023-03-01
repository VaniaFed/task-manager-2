module.exports = {
	env: {
		browser: true,
		es2022: true,
	},
	extends: ['eslint:recommended', 'airbnb', 'prettier', 'plugin:prettier/recommended'],
	plugins: ['prettier'],
	parser: '@babel/eslint-parser',
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
		'no-param-reassign': 2,
		'no-use-before-define': 2,
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'implicit-arrow-linebreak': 2,
		'consistent-return': 0,
		'no-console': 0,
		'global-require': 0,
		'prettier/prettier': 0,
		'import/no-extraneous-dependencies': 0,
		'import/prefer-default-export': 0,
	},
	settings: {
		'import/resolver': {
			alias: {
				map: [
					['@scss', './src/scss'],
					['@blocks', './src/scss/blocks'],
					['@utilities', './src/scss/utilities'],
				],
				extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss'],
			},
		},
	},
};
