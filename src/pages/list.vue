<script lang="ts" setup>
import Dialog from '@/components/Dialog.vue'
import { nextTick, ref } from 'vue'

// const showMask = ref(false)
async function loadImg(src: string): Promise<{ realWidth: number, realHeight: number }> {
	const maxImageHeight = window.innerHeight - 64
	return new Promise((resolve, reject) => {
		const img = new Image()
		img.src = src
		img.onload = (e) => {
			const realWidth = (maxImageHeight / e.target.height) * e.target.width
			resolve({
				realWidth,
				realHeight: maxImageHeight,
			})
		}
		img.onerror = (error) => {
		// 处理图片加载错误
			reject(error)
		}
	})
}

function useDialog() {
	const showMask = ref(false)
	const dialogMediaWidth = ref(0)
	const zoom = ref(1)
	let firstInfo = {}
	let lastInfo = {}
	let dialogNode = null
	let maskNode = null
	let convertY = 0
	let convertX = 0

	const openDialogHandler = async (e: MouseEvent, imageUrl: string) => {
		firstInfo = e.target.getBoundingClientRect()
		const { realWidth } = await loadImg(imageUrl)
		dialogMediaWidth.value = realWidth
		showMask.value = true

		nextTick(() => {
			dialogNode = document.querySelector('.dialog-content')
			maskNode = document.querySelector('.dialog')
			lastInfo = dialogNode.getBoundingClientRect()
			zoom.value = firstInfo.width / dialogMediaWidth.value
			convertX = firstInfo.x - lastInfo.x
			convertY = firstInfo.y - lastInfo.y

			dialogNode.style.transform = `translate(calc(-50% + ${convertX}px), calc(-50% + ${convertY}px)) scale(${zoom.value})`
			dialogNode.style.transformOrigin = 'left top'

			requestAnimationFrame(() => {
				dialogNode.style.transition = 'transform 0.4s, width 0.4s'
				dialogNode.style.width = `${lastInfo.width}px`
				dialogNode.style.transform = ''
				maskNode.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'
			})
		})
	}

	const closeDialogHandler = () => {
		const dialogFirstInfo = dialogNode.getBoundingClientRect()
		dialogNode.style.left = `${firstInfo.x}px`
		dialogNode.style.top = `${firstInfo.y}px`
		dialogNode.style.transition = 'none'
		dialogNode.style.width = `${dialogMediaWidth.value}px`
		dialogNode.style.overflow = 'hidden'
		dialogNode.style.transform = `scale(${zoom.value})`

		nextTick(() => {
			const dialogLastInfo = dialogNode.getBoundingClientRect()
			const convertX = dialogFirstInfo.x - dialogLastInfo.x
			const convertY = dialogFirstInfo.y - dialogLastInfo.y
			dialogNode.style.width = `${dialogFirstInfo.width}px`
			dialogNode.style.overflow = 'visible'
			dialogNode.style.transform = `translate(${convertX}px, ${convertY}px) scale(1)`

			requestAnimationFrame(() => {
				dialogNode.style.transition = 'transform 0.4s, width 0.4s'
				dialogNode.style.width = `${dialogMediaWidth.value}px`
				dialogNode.style.overflow = 'hidden'
				dialogNode.style.transform = `scale(${zoom.value})`
				maskNode.style.backgroundColor = 'transparent'
			})

			dialogNode.addEventListener('transitionend', () => {
				showMask.value = false
			})
		})
	}

	return { showMask, openDialog: openDialogHandler, closeDialog: closeDialogHandler, mediaWidth: dialogMediaWidth }
}

const { showMask, openDialog, closeDialog, mediaWidth } = useDialog()

const list = ref([
	{ width: 250, height: 300 },
	{ width: 250, height: 420 },
	{ width: 250, height: 280 },
	{ width: 250, height: 320 },
	{ width: 250, height: 360 },
	{ width: 250, height: 300 },
	{ width: 250, height: 400 },
	{ width: 250, height: 340 },
])
const imageUrl = 'http://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1733058970611.JPG'
</script>

<template>
	<div class="animation-page">
		<div class="left-side" />
		<div class="flip-animation">
			<div
				v-for="(item, index) in list"
				:key="index"
				class="flip-card"
				@click="(e) => openDialog(e, imageUrl)"
			>
				<img
					:src="imageUrl"
					alt=""
				>
			</div>
		</div>
		<Dialog v-if="showMask" :media-width="mediaWidth" :image-url="imageUrl" @close="closeDialog" />
	</div>
</template>

<style scoped>
.animation-page {
  display: flex;
  align-content: flex-start;
  width: 1650px;
  margin: 0 auto;
  padding-top: 120px;
  .left-side {
    width: 260px;
  }
  .flip-animation {
    display: grid;
    grid-template-columns: repeat(5, 250px);
    grid-gap: 10px;
  }
}
.flip-card {
  > img {
    width: 100%;
    border-radius: 20px;
  }
}
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  transition: background-color 0.4s;
  z-index: 9999;
  .dialog-content {
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    height: calc(100% - 64px);
    background-color: #fff;
    border-radius: 20px;
    overflow: visible;
    .left-container {
      flex-shrink: 0;
      flex-grow: 0;
      height: 100%;
      border-radius: 20px 0 0 20px;
      overflow: hidden;
      img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    }
    .right-container {
      width: 440px;
      flex-shrink: 0;
      flex-grow: 1;
      border-radius: 0 20px 20px 0;
      overflow: hidden;
      padding: 10px;
      img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
