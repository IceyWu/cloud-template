// @ts-check
import antfu from '@antfu/eslint-config'
import oxlint from 'eslint-plugin-oxlint'

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
			// 关闭会导致换行问题的规则
			'vue/singleline-html-element-content-newline': 'off',
			'vue/multiline-html-element-content-newline': 'off',
			'vue/html-closing-bracket-newline': 'off',
			'vue/max-attributes-per-line': 'off',
		},
  },
  // 集成 oxlint 插件，自动禁用与 oxlint 冲突的 ESLint 规则
  {
    plugins: {
      oxlint,
    },
    rules: {
      ...oxlint.configs.recommended.rules,
    },
  },
)
