import Cookies from 'js-cookie'
import { storageSession } from '@/utils/sessionStorage'

export interface DataInfo<T> {
	/** token */
	accessToken: string
	/** `accessToken`的过期时间（时间戳） */
	expires: T
	/** 用于调用刷新accessToken的接口时所需的token */
	refreshToken: string
	/** 用户名 */
	username?: string
	/** 当前登陆用户的角色 */
	roles?: Array<string>
}

export const userKeyBase = 'user-info'
export const TokenKeyBase = 'authorized-token'
export const AccessTokenKey = 'accessToken'
export const RefreshTokenKey = 'refreshToken'
export const ExpiresKey = 'expiresIn'
/**
 * 通过`multiple-tabs`是否在`cookie`中，判断用户是否已经登录系统，
 * 从而支持多标签页打开已经登录的系统后无需再登录。
 * 浏览器完全关闭后`multiple-tabs`将自动从`cookie`中销毁，
 * 再次打开浏览器需要重新登录系统
 * */
export const multipleTabsKey = 'multiple-tabs'

/** 获取`token` */
export function getToken(roleName?: string): DataInfo<number> {
	const TokenKey = roleName ? `${roleName}-${TokenKeyBase}` : TokenKeyBase
	const sessionKey = roleName ? `${roleName}-${userKeyBase}` : userKeyBase
	// 此处与`TokenKey`相同，此写法解决初始化时`Cookies`中不存在`TokenKey`报错
	return Cookies.get(TokenKey)
		? JSON.parse(Cookies.get(TokenKey) ?? '')
		: storageSession().getItem(sessionKey)
}

/**
 * @description 设置`token`以及一些必要信息并采用无感刷新`token`方案
 * 无感刷新：后端返回`accessToken`（访问接口使用的`token`）、`refreshToken`（用于调用刷新`accessToken`的接口时所需的`token`，`refreshToken`的过期时间（比如30天）应大于`accessToken`的过期时间（比如2小时））、`expires`（`accessToken`的过期时间）
 * 将`accessToken`、`expires`这两条信息放在key值为authorized-token的cookie里（过期自动销毁）
 * 将`username`、`roles`、`refreshToken`、`expires`这四条信息放在key值为`user-info`的localStorage里（利用`multipleTabsKey`当浏览器完全关闭后自动销毁）
 */
export function setToken(data: DataInfo<number>, roleName?: string) {
	console.log('🐠-----data-----', data)
	const TokenKey = roleName ? `${roleName}-${TokenKeyBase}` : TokenKeyBase
	const userKey = roleName ? `${roleName}-${userKeyBase}` : userKeyBase
	let expires = 0
	const { accessToken, refreshToken = '' } = data
	expires = new Date(data.expires * 1000 + new Date().getTime()).getTime() // 如果后端直接设置时间戳，将此处代码改为expires = data.expires，然后把上面的DataInfo<Date>改成DataInfo<number>即可
	const cookieString = JSON.stringify({ accessToken, expires })

	expires > 0
		? Cookies.set(TokenKey, cookieString, {
				expires: (expires - Date.now()) / 86400000,
			})
		: Cookies.set(TokenKey, cookieString)

	function setUserKey(username: string, roles: Array<string>) {
		storageSession().setItem(userKey, {
			refreshToken,
			expires,
			username,
			roles,
		})
	}

	if (data.username && data.roles) {
		const { username, roles } = data
		setUserKey(username, roles)
	} else {
		const username =
			storageSession().getItem<DataInfo<number>>(userKey)?.username ?? ''
		const roles =
			storageSession().getItem<DataInfo<number>>(userKey)?.roles ?? []
		setUserKey(username, roles)
	}
}

/** 删除`token`以及key值为`user-info`的localStorage信息 */
export function removeToken(roleName?: string) {
	const TokenKey = roleName ? `${roleName}-${TokenKeyBase}` : TokenKeyBase
	Cookies.remove(TokenKey)
	storageSession().clear()
}

/** 格式化token（jwt格式） */
export const formatToken = (token: string, authName?: string): string => {
	return authName ? `${authName} ${token}` : token
}
