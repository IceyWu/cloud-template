<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
	mediaWidth: Number,
	imageUrl: String, // 添加 imageUrl 作为属性
})

const emit = defineEmits(['close'])
function close() {
	emit('close')
}
</script>

<template>
	<div class="dialog" @click="close">
		<div class="dialog-content" @click.stop>
			<div class="left-container" :style="{ width: `${mediaWidth}px` }">
				<img :src="imageUrl" alt="">
			</div>
			<div class="right-container">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, eius totam, debitis officia harum iste temporibus nobis quisquam odio porro nihil numquam ratione at ducimus sint exercitationem aspernatur assumenda provident?</div>
		</div>
	</div>
</template>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  transition: background-color 0.4s;
  z-index: 9999;
}
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
}
.left-container {
  flex-shrink: 0;
  flex-grow: 0;
  height: 100%;
  border-radius: 20px 0 0 20px;
  overflow: hidden;
}
.right-container {
  width: 440px;
  flex-shrink: 0;
  flex-grow: 1;
  border-radius: 0 20px 20px 0;
  overflow: hidden;
  padding: 10px;
}
</style>
