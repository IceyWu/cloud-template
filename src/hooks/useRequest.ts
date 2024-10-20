import { deepClone, getObjVal, isArray } from '@iceywu/utils'

import { reactive, ref } from 'vue'
import { requestTo } from '~/composables/requestTo'
import type { ApiObjOpt, ListObj, ParamsObj } from '~/utils/http/requestList'
import { ApiListGetData, baseDefaultPageKey } from '~/utils/http/requestList'

const defaultSearchVal = {
  label_type: null,
}

export function useRequest(target?: string) {
  const ApiObj: ApiObjOpt = ApiListGetData
  /**
   * 查询条件
   */
  const search = ref({})

  const result = ref<ListObj>({
    data: [],
    loading: false,
    finished: false,
    refreshing: false,
    total: 0,
  })
	const loading = ref(false)
  const paramsObj = reactive<ParamsObj>({
    page: 0,
    size: 10,
  })

	/**
	 * 数据初始化
	 */
  function initData() {
    result.value.finished = false
    result.value.refreshing = false
    result.value.data = []
    paramsObj.page = 0
		paramsObj.size = 10
  }
	/**
	 * 获取目标信息
	 */
	const getTargetInfo = () => {
    const tempTarget = target || ('default' as string)
    return ApiObj[tempTarget] || {}
  }
	const getParamsVal = (reloadSize?: number) => {
    const { otherParams, isNeedPageAndSize, defaultPageKey } = getTargetInfo() || {}
    const params: any = {

    }
		const page_key = getObjVal(defaultPageKey, 'page', baseDefaultPageKey.page)
		const size_key = getObjVal(defaultPageKey, 'size', baseDefaultPageKey.size)
    if (isNeedPageAndSize) {
      params[page_key] = paramsObj.page
      params[size_key] = paramsObj.size
    }

    if (reloadSize) {
			params[page_key] = 0
			params[size_key] = reloadSize
    }

    const tempParams = { ...params, ...otherParams, ...search.value }
    return tempParams
  }

	const setDefaultVal = (res: any) => {
		if (isArray(res)) {
			result.value.data = result.value.data.concat(res || [])
		}
else {
			result.value.data = res
		}
	}

/**
 * 加载数据
 * @param isReload 是否重新加载
 */
  async function onLoad(isReload = false) {
    if (result.value.loading || result.value.finished || loading.value)
return
    const totalNumTemp = result.value.data.length || 0
    if (isReload && totalNumTemp > 0) {
    return await getData(result.value.data.length)
    }
 else {
      paramsObj.page++
    return await getData()
    }
  }
  async function onRefresh(isReload = false) {
    if (!isReload) {
      // 参数重置
      initData()
      // 初始化状态
      result.value.refreshing = true
    }
 else {
      result.value.loading = false
      result.value.finished = false
			loading.value = false
    }
   return await onLoad(isReload)
  }

  async function getData(reloadSize?: number) {
    result.value.loading = true
		loading.value = true
    const { requestApi, listFormat, totalFormat } = getTargetInfo()
		if (!requestApi) {
			console.error('requestApi is not defined')
			result.value.finished = true
			result.value.loading = false
			result.value.refreshing = false
			loading.value = false
			return
		}
    const tempParams = getParamsVal(reloadSize)

    const [err, resData = []] = await requestTo(requestApi(tempParams), {
			isOnlyData: false,
		})

    if (result.value.refreshing) {
      result.value.data = []
      result.value.refreshing = false
    }
    const total = totalFormat ? totalFormat(resData) : getObjVal(resData, 'length', 0)
		const tempList = listFormat ? listFormat(resData) : resData

    result.value.total = total

    if (reloadSize) {
      result.value.data = tempList || []
    }
 else {
      // result.value.data = result.value.data.concat(tempList || [])
			setDefaultVal(tempList)
    }
    result.value.finished = result.value.data.length >= total

    if (err) {
      result.value.finished = true
    }

    // 加载状态停止
    result.value.loading = false
		loading.value = false
  }
  // 删除列表项
  const removeListItemByIndex = (index: number) => {
    result.value.data.splice(index, 1)
  }
  // 更新列表项
  const updateListItemByIndex = (index: number, item: never) => {
    if (index > -1) {
      result.value.data[index] = item
    }
  }

  // 重置
  function reset() {
    search.value = deepClone(defaultSearchVal)
    initData()
    onRefresh()
  }

  return {
    search,
    onRefresh,
    onLoad,
    result,
    removeListItemByIndex,
    updateListItemByIndex,
    reset,
    getParamsVal,
		loading,
  }
}
