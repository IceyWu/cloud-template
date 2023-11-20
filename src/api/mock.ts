import { http } from '@/utils/http'

export type UserResult = {
	code: number
	msg: string
	result: {}
	timestamp: number
}

/** 登录 */
export const getLogin = (data?: object) => {
	return http.request<any>('post', '/login', { data })
}
/** 登录 */
export const refreshTokenApi = (data?: object) => {
	return http.request<any>('post', '/refreshTokenApi', { data })
}
/** 登录 */
export const RefreshTokenResult = (data?: object) => {
	return http.request<any>('post', '/RefreshTokenResult', { data })
}

/** 获取管理员信息 */
export const testRequestGet = (params?: object) => {
	return http.request<any>('get', '/api/mock/get', { params })
}
