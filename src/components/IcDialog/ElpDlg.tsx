import { defineComponent, h } from 'vue'
import { ElButton, ElDialog, dialogProps } from 'element-plus'

const props = {
	...dialogProps,
}

export default defineComponent({
	name: 'ElpDialog',
	props,
	emits: ['close', 'ok', 'cancel'],
	setup(props, { emit, slots }) {
		const footerButtonsList = [
			{
				label: '取消',
				text: true,
				bg: true,
				onClick: () => {
					emit('cancel')
				},
			},
			{
				label: '确定',
				type: 'primary',
				text: true,
				bg: true,
				onClick: () => {
					emit('ok')
				},
			},
		] as Array<any>

		const footer = () => {
			return footerButtonsList.map((item, index) =>
				h(ElButton, {
					...item,
					innerHTML: item.label,
				}),
			)
		}
		return () => (
			<>
				<ElDialog {...props} modelValue={true} onClose={() => emit('close')}>
					{{
						header: slots?.header,
						default: slots?.default || (
							<div>
								12121:
								{props.title}
							</div>
						),
						footer: slots?.footer || footer,
					}}
				</ElDialog>
			</>
		)
	},
})
