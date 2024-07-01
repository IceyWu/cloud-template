import { http } from '@/utils/http'

export interface UserResult {
	code: number
	msg: string
	result: any
	timestamp: number
}

/** 登录 */
export function getLogin(data?: object) {
	return http.request<any>('post', '/login', { data })
}
/** 登录 */
export function refreshTokenApi(data?: object) {
	return http.request<any>('post', '/refreshTokenApi', { data })
}
/** 登录 */
export function RefreshTokenResult(data?: object) {
	return http.request<any>('post', '/RefreshTokenResult', { data })
}

/** 获取管理员信息 */
export function testRequestGet(params?: object) {
	return http.request<any>('get', '/api/mock/get', { params })
}
