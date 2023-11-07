import { defineStore } from 'pinia'
import { getLogin, refreshTokenApi } from '@/api/admin'
import { UserResult, RefreshTokenResult } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'

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

		const loginByUsername = (data: any) => {
			return new Promise<UserResult>((resolve, reject) => {
				getLogin(data)
					.then((data) => {
						if (data) {
							console.log('-------login data------', data)
							const {
								code,
								result,
								result: {
									admin,
									admin: { name },
									token: { access_token, refresh_token, expires_in },
								},
							} = data
							if (code === 200 && result) {
								const setParams = {
									username: name,
									roles: ['admin'],
									accessToken: access_token,
									refreshToken: refresh_token,
									expires: new Date().getTime() + expires_in * 1000,
								}
								// console.log("setParams", setParams);
								SET_USERINFO(admin)
								setToken(setParams)
								resolve(data)
							} else {
								reject(data)
							}
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
			return new Promise<RefreshTokenResult>((resolve, reject) => {
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
