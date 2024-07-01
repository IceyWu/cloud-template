// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
  },
	{
    rules: {
			'style/no-tabs': 'off',
			'style/quote-props': 'off',
			'vue/html-indent': 'off',
			'style/indent': 'off',
			'node/prefer-global/process': 'off',
			'node/prefer-global/buffer': 'off',
			'unused-imports/no-unused-vars': 'off',
			'vue/singleline-html-element-content-newline': 'off',
		},
  },
)
