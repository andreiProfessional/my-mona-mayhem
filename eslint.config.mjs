import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
	{
		ignores: ['dist', '.astro', 'node_modules'],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			quotes: ['warn', 'single', { avoidEscape: true }],
			semi: ['warn', 'always'],
			indent: ['warn', 'tab'],
			eqeqeq: ['error', 'always'],
			'no-var': 'error',
			'prefer-const': 'error',
		},
	},
	{
		files: ['docs/**/*.js'],
		rules: {
			'no-undef': 'off',
		},
	},
];
