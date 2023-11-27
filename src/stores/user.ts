import { defineStore } from 'pinia'
import { getLogin, refreshTokenApi, UserResult } from '@/api/mock'
import {
	type DataInfo,
	setToken,
	removeToken,
	AccessTokenKey,
	RefreshTokenKey,
	ExpiresKey,
} from '@/utils/auth'

export const useUserStore = defineStore(
	'lp-user',
	() => {
		const username = ref('')
		const userInfo = ref({})
		const roles = ref([])

		const SET_USERNAME = (name: string) => {
			username.value = name
		}

		const SET_ROLES = (rolesData: Array<string>) => {
			roles.value = rolesData
		}

		const SET_USERINFO = (data: any) => {
			userInfo.value = data
		}

		const loginByUsername = (dataT: any) => {
			return new Promise<UserResult>((resolve, reject) => {
				getLogin(dataT)
					.then((res) => {
						const { code, data } = res
						if (code === 200) {
							const { admin, token } = data
							const TokenInfo: DataInfo<number> = {
								username: admin.name,
								roles: [admin.name],
								accessToken: token[AccessTokenKey],
								refreshToken: token[RefreshTokenKey],
								expires: token[ExpiresKey] * 1000,
							}
							setToken(TokenInfo, 'a')
							resolve(res)
						} else {
							reject(res)
						}
					})
					.catch((error) => {
						reject(error)
					})
			})
		}

		const logOut = () => {
			username.value = ''
			roles.value = []
			removeToken()
		}

		const handRefreshToken = (data: any) => {
			return new Promise<any>((resolve, reject) => {
				refreshTokenApi(data)
					.then((data) => {
						if (data) {
							setToken(data.data)
							resolve(data)
						}
					})
					.catch((error) => {
						reject(error)
					})
			})
		}

		return {
			username,
			userInfo,
			roles,
			SET_USERNAME,
			SET_ROLES,
			SET_USERINFO,
			loginByUsername,
			logOut,
			handRefreshToken,
		}
	},
	{
		persist: {
			key: 'pure-user-key',
			// storage: storageSession as StorageLike
		},
	},
)
