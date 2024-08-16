/**
 * 用户访问相关的弹窗
 */
import { h } from 'vue'
import { domAdd } from '~/utils/domAdd'
import CustomPopupBase from '@/components/Popup/base.vue'

function domSet(el: HTMLDivElement) {
	el.setAttribute(
		'style',
		'position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: 9999;',
	)
}

export function showDlg({ title = '我是标题' }) {
	return new Promise((resolve, reject) => {
		let popupInstance: any
		const handleClose = () => {
			popupInstance?.destroy()
		}
		const handleCancel = () => {
			popupInstance?.destroy()
			reject(new Error('cancel'))
		}
		const handleOk = () => {
			popupInstance?.destroy()
			resolve('ok')
		}
		popupInstance = domAdd(
			h(
				CustomPopupBase,
				{
					title,
					onClose: handleClose,
					onOk: handleOk,
					onCancel: handleCancel,
				},

			),
			{ domSet },
		)
		popupInstance.add()
	})
}
