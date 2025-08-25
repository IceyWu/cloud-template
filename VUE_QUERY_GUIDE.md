# Vue Query 集成说明

## 概述

本项目已经集成了 `@tanstack/vue-query` 来替换原有的接口封装方式，提供更好的缓存、状态管理和错误处理能力。

## 文件结构

```
src/
├── utils/
│   └── api.ts              # 基于 axios 的 API 客户端
├── composables/
│   └── useApi.ts           # Vue Query hooks 封装
├── plugins/
│   └── vue-query.ts        # Vue Query 插件配置
├── api/
│   └── mock.ts             # API 接口定义 (已重构)
└── components/
    └── VueQueryExample.vue # 使用示例组件
```

## 主要功能

### 1. API 客户端 (`src/utils/api.ts`)

基于 axios 创建的 API 客户端，包含：

- 自动添加认证 token
- 统一的错误处理
- 进度条显示
- 响应数据格式化

### 2. Vue Query Hooks (`src/composables/useApi.ts`)

提供以下 hooks：

- `useGetQuery` - 用于 GET 请求
- `usePostMutation` - 用于 POST 请求
- `usePutMutation` - 用于 PUT 请求
- `useDeleteMutation` - 用于 DELETE 请求
- `useInvalidateQueries` - 缓存管理

### 3. API 接口 (`src/api/mock.ts`)

重构后的接口定义，提供：

- 基于 hooks 的新 API 调用方式
- 向后兼容的函数式调用

## 使用方法

### 查询数据 (GET)

```vue
<script setup>
import { useTestDataQuery } from '@/api/mock'

// 使用 query hook
const { data, error, isLoading, refetch } = useTestDataQuery(
  { page: 1, size: 10 },
  { enabled: true }
)
</script>

<template>
  <div>
    <div v-if="isLoading">加载中...</div>
    <div v-else-if="error">错误: {{ error.message }}</div>
    <div v-else>
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
      <button @click="refetch">刷新</button>
    </div>
  </div>
</template>
```

### 提交数据 (POST/PUT/DELETE)

```vue
<script setup>
import { useLoginMutation } from '@/api/mock'

// 使用 mutation hook
const { mutate: login, isPending, isSuccess, error } = useLoginMutation()

function handleLogin() {
  login({
    url: '/login',
    data: {
      username: 'user@example.com',
      password: '123456'
    }
  })
}
</script>

<template>
  <div>
    <button @click="handleLogin" :disabled="isPending">
      {{ isPending ? '登录中...' : '登录' }}
    </button>
    <div v-if="isSuccess">登录成功!</div>
    <div v-if="error" class="error">{{ error.message }}</div>
  </div>
</template>
```

### 缓存管理

```vue
<script setup>
import { useInvalidateQueries } from '@/composables/useApi'

const { invalidateAll, invalidateByKey } = useInvalidateQueries()

// 清除特定缓存
function clearUserCache() {
  invalidateByKey(['testData'])
}

// 清除所有缓存
function clearAllCache() {
  invalidateAll()
}
</script>
```

## Vue Query 优势

1. **自动缓存**: 相同的查询会自动缓存，减少不必要的网络请求
2. **后台更新**: 数据在后台自动更新，保持数据新鲜度
3. **错误重试**: 自动重试失败的请求
4. **加载状态**: 提供详细的加载状态管理
5. **乐观更新**: 支持乐观更新和回滚
6. **离线支持**: 支持离线时的数据访问

## 迁移指南

### 从旧的 API 调用方式迁移

**旧方式:**

```javascript
import { testRequestGet } from '@/api/mock'

const data = await testRequestGet({ page: 1 })
```

**新方式:**

```javascript
import { useTestDataQuery } from '@/api/mock'

const { data, isLoading } = useTestDataQuery({ page: 1 })
```

### 兼容性

为了平滑迁移，所有原有的函数式 API 调用仍然保留，可以继续使用：

```javascript
// 仍然可用
import { getLogin, testRequestGet } from '@/api/mock'

const loginResult = await getLogin({ username: 'test', password: '123' })
const testData = await testRequestGet({ page: 1 })
```

## 配置选项

可以在 `src/plugins/vue-query.ts` 中调整全局配置：

```typescript
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,  // 5分钟
        gcTime: 1000 * 60 * 10,    // 10分钟
        retry: 3,                   // 重试3次
      },
    },
  },
})
```

## 示例组件

查看 `src/components/VueQueryExample.vue` 获取完整的使用示例，包括：

- 查询状态展示
- 手动刷新
- 错误处理
- 缓存管理
- Mutation 操作
