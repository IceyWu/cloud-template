import { getObjVal } from '@iceywu/utils'
import { listGet } from '~/api/mock'

export interface ApiObjOpt {
  [key: string]: {
    requestApi: any
    otherParams?: any
    isNeedPageAndSize?: boolean
		defaultPageKey?: {
			page: string
			size: string
		}
		listFormat?: (data: any) => any
		totalFormat?: (data: any) => any
  }
}

export interface ListObj {
	data: any[]
	loading: boolean
	finished: boolean
	refreshing: boolean
	total?: number
}
export interface ParamsObj {
	page: number
	size: number
}

export const baseDefaultPageKey = {
	page: 'page',
	size: 'size',
}

export const ApiListGetData: ApiObjOpt = {
	default: {
		requestApi: listGet,
		// requestApi: null,
		isNeedPageAndSize: false,
		defaultPageKey: baseDefaultPageKey,
		listFormat: (data: any) => getObjVal(data, 'data', []),
		totalFormat: (data: any) => getObjVal(data, 'meta.totalElements', 0),
		otherParams: {},
	},
	test: {
		requestApi: null,
		isNeedPageAndSize: false,
		otherParams: {},
	},

}
