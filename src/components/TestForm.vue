<script setup lang="ts">
import { ref } from 'vue'

interface FormProps {
	formInline: () => {
		name?: string
		principal?: string
		phone?: string
	}
}

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({
		name: '',
		principal: '',
		phone: '',
	}),
})

const ruleFormRef = ref()
const newFormInline = ref(props.formInline)

function getRef() {
	return ruleFormRef.value
}

defineExpose({ getRef })
</script>

<template>
	<el-form
		ref="ruleFormRef"
		:model="newFormInline"
		:rules="formRules"
		label-width="82px"
	>
		<el-row :gutter="30">
			<el-form-item label="部门名称" prop="name">
				<el-input
					v-model="newFormInline.name"
					clearable
					placeholder="请输入部门名称"
				/>
			</el-form-item>

			<el-form-item label="部门负责人">
				<el-input
					v-model="newFormInline.principal"
					clearable
					placeholder="请输入部门负责人"
				/>
			</el-form-item>

			<el-form-item label="手机号" prop="phone">
				<el-input
					v-model="newFormInline.phone"
					clearable
					placeholder="请输入手机号"
				/>
			</el-form-item>
		</el-row>
	</el-form>
</template>
