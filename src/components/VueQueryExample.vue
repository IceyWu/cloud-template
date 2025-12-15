<!-- 演示如何使用 vue-query 的示例组件 -->
<script setup lang="ts">
import { ref } from "vue";
import { useLoginMutation, useTestDataQuery } from "@/api/mock";
import { useInvalidateQueries } from "@/composables/useApi";

// 查询参数
const enabled = ref(true);
const params = ref({ page: 1, size: 10 });

// 使用 query hook
const { data, error, isLoading, isFetching, refetch } = useTestDataQuery(params, {
  enabled: enabled.value,
});

// 使用 mutation hook
const {
  mutate: login,
  data: loginData,
  error: loginError,
  isPending,
  isSuccess,
  isError,
  isIdle,
} = useLoginMutation();

// 缓存操作
const { invalidateAll, invalidateByKey } = useInvalidateQueries();

function toggleEnabled() {
  enabled.value = !enabled.value;
}

function handleLogin() {
  login({
    url: "/login",
    data: {
      username: "test@example.com",
      password: "123456",
    },
  });
}

function invalidateTestData() {
  invalidateByKey(["testData"]);
}
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Vue Query 示例</h2>

    <!-- 展示查询状态 -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">获取测试数据</h3>
      <div class="space-y-2">
        <div>
          <span class="font-medium">加载状态:</span>
          <span :class="{ 'text-blue-500': isLoading, 'text-green-500': !isLoading }">
            {{ isLoading ? '加载中...' : '加载完成' }}
          </span>
        </div>
        <div>
          <span class="font-medium">数据:</span>
          <pre class="text-sm p-2 rounded bg-gray-100">{{ JSON.stringify(data, null, 2) }}</pre>
        </div>
        <div v-if="error" class="text-red-500">
          <span class="font-medium">错误:</span>
          {{ error.message }}
        </div>
      </div>

      <div class="mt-4 space-x-2">
        <button
          :disabled="isFetching"
          class="text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
          @click="() => refetch()"
        >
          {{ isFetching ? '刷新中...' : '刷新数据' }}
        </button>
        <button
          class="text-white px-4 py-2 rounded bg-gray-500 hover:bg-gray-600"
          @click="toggleEnabled"
        >
          {{ enabled ? '禁用查询' : '启用查询' }}
        </button>
      </div>
    </div>

    <!-- 展示 Mutation 状态 -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">登录操作</h3>
      <div class="space-y-2">
        <div>
          <span class="font-medium">状态:</span>
          <span
:class="{
            'text-blue-500': isPending,
            'text-green-500': isSuccess,
            'text-red-500': isError,
            'text-gray-500': isIdle,
          }">
            {{
              isPending ? '登录中...'
              : isSuccess ? '登录成功'
              : isError ? '登录失败'
              : '等待操作'
            }}
          </span>
        </div>
        <div v-if="loginData">
          <span class="font-medium">登录结果:</span>
          <pre class="text-sm p-2 rounded bg-gray-100">{{ JSON.stringify(loginData, null, 2) }}</pre>
        </div>
        <div v-if="loginError" class="text-red-500">
          <span class="font-medium">登录错误:</span>
          {{ loginError.message }}
        </div>
      </div>

      <div class="mt-4">
        <button
          :disabled="isPending"
          class="text-white px-4 py-2 rounded bg-green-500 hover:bg-green-600 disabled:opacity-50"
          @click="handleLogin"
        >
          {{ isPending ? '登录中...' : '模拟登录' }}
        </button>
      </div>
    </div>

    <!-- Cache 操作 -->
    <div>
      <h3 class="text-lg font-semibold mb-2">缓存操作</h3>
      <div class="space-x-2">
        <button
          class="text-white px-4 py-2 rounded bg-orange-500 hover:bg-orange-600"
          @click="invalidateTestData"
        >
          清除测试数据缓存
        </button>
        <button
          class="text-white px-4 py-2 rounded bg-red-500 hover:bg-red-600"
          @click="invalidateAll"
        >
          清除所有缓存
        </button>
      </div>
    </div>
  </div>
</template>
