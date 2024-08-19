/**
 * 用户访问相关的弹窗
 */
import { h } from 'vue'
import { domAdd } from '~/utils/domAdd'
import ElpDialog from '~/components/IcDialog/ElpDlg'
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
			// eslint-disable-next-line prefer-promise-reject-errors
			reject('cancel')
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
export function showDlgTest(options: any) {
	const { renderer, ...data } = options
	return new Promise((resolve, reject) => {
		let popupInstance: any
		const testDom = h(ElpDialog as any, {
			data,
		})
		const handleClose = () => {
			popupInstance?.destroy()
		}
		const handleCancel = () => {
			popupInstance?.destroy()
			// eslint-disable-next-line prefer-promise-reject-errors
			reject('cancel')
		}
		const handleOk = () => {
			resolve({
				done:	popupInstance?.destroy,
			})
		}
		const done = () => {
			resolve({
				done:	popupInstance?.destroy,
				data,
			})
		}
		popupInstance = domAdd(
			h(
				testDom,
				{
					...data,
					onClose: handleClose,
					onOk: done,
					onCancel: handleCancel,
				},
				{
					header: renderer?.header,
					default: renderer?.default,
					footer: renderer?.footer,

				},

			),
			{ domSet },
		)
		popupInstance.add()
	})
}
