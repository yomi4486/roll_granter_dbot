// eslint.config.js
import * as eslint from '@eslint/js';
import * as tseslint from 'typescript-eslint';
import * as prettier from 'eslint-config-prettier';

const myLintConfig = tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ["**/*.{js,mjs,cjs,ts}"],
		rules: {
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/no-explicit-any': 'warn',
			'import/no-commonjs': 'off',
			'no-restricted-syntax': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_' },
			],
			'no-console': ['warn', { allow: ['warn', 'error'] }],
		},
	},
	{
		ignores: ['dist/', 'node_modules/', 'test/', 'eslint.config.cjs'],
	},
	prettier,
)

module.exports = myLintConfig