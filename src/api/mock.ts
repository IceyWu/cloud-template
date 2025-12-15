import { useGetQuery, usePostMutation } from "@/composables/useApi";
import { get, post } from "@/utils/api";

export interface UserResult {
  code: number;
  msg: string;
  result: any;
  timestamp: number;
}

// 使用 vue-query hooks 替换原来的函数式调用

// 登录 mutation
export function useLoginMutation() {
  return usePostMutation({
    onSuccess: (_data) => {
      // 登录成功处理逻辑
    },
    onError: (error) => {
      console.error("登录失败:", error);
    },
  });
}

// 刷新 token mutation
export function useRefreshTokenMutation() {
  return usePostMutation({
    onSuccess: (_data) => {
      // Token 刷新成功处理逻辑
    },
    onError: (error) => {
      console.error("Token 刷新失败:", error);
    },
  });
}

// 获取测试数据 query
export function useTestDataQuery(params?: any, options?: { enabled?: boolean }) {
  return useGetQuery(["testData", params], "/api/mock/get", params, {
    enabled: options?.enabled,
    staleTime: 1000 * 60 * 5, // 5分钟
  });
}

// 保留原来的函数式调用作为兼容性选项（如果需要的话）

/** 登录 */
export function getLogin(data?: object) {
  return post<any>("/login", data);
}

/** 刷新Token */
export function refreshTokenApi(data?: object) {
  return post<any>("/refreshTokenApi", data);
}

/** 刷新Token结果 */
export function RefreshTokenResult(data?: object) {
  return post<any>("/RefreshTokenResult", data);
}

/** 获取管理员信息 */
export function testRequestGet(params?: object) {
  return get<any>("/api/mock/get", params);
}
