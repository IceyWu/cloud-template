import { deepClone, getObjVal } from '@iceywu/utils'

import { reactive, ref } from 'vue'
import { requestTo } from '~/composables/requestTo'
import type { ApiObjOpt, ListObj, ParamsObj } from '~/utils/http/listGet'
import { ApiListGetData, baseDefaultPageKey } from '~/utils/http/listGet'

const defaultSearchVal = {
  label_type: null,
}

export function useGetListData(target?: string) {
  const ApiObj: ApiObjOpt = ApiListGetData
  /**
   * 查询条件
   */
  const search = ref({})

  const listObj = ref<ListObj>({
    list: [],
    loading: false,
    finished: false,
    refreshing: false,
    total: 0,
  })
  const paramsObj = reactive<ParamsObj>({
    page: 0,
    size: 10,
  })

	/**
	 * 数据初始化
	 */
  function initData() {
    listObj.value.finished = false
    listObj.value.refreshing = false
    listObj.value.list = []
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

/**
 * 加载数据
 * @param isReload 是否重新加载
 */
  async function onLoad(isReload = false) {
    if (listObj.value.loading || listObj.value.finished)
return
    const totalNumTemp = listObj.value.list.length || 0
    if (isReload && totalNumTemp > 0) {
    return await getData(listObj.value.list.length)
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
      listObj.value.refreshing = true
    }
 else {
      listObj.value.loading = false
      listObj.value.finished = false
    }
   return await onLoad(isReload)
  }

  async function getData(reloadSize?: number) {
    listObj.value.loading = true
    const { requestApi, listFormat, totalFormat } = getTargetInfo()
		if (!requestApi) {
			console.error('requestApi is not defined')
			listObj.value.finished = true
			listObj.value.loading = false
			return
		}
    const tempParams = getParamsVal(reloadSize)

    const [err, resData = []] = await requestTo(requestApi(tempParams), {
			isOnlyData: false,
		})

    if (listObj.value.refreshing) {
      listObj.value.list = []
      listObj.value.refreshing = false
    }
    const total = totalFormat ? totalFormat(resData) : getObjVal(resData, 'length', 0)
		const tempList = listFormat ? listFormat(resData) : resData

    listObj.value.total = total

    if (reloadSize) {
      listObj.value.list = tempList || []
    }
 else {
      listObj.value.list = listObj.value.list.concat(tempList || [])
    }
    listObj.value.finished = listObj.value.list.length >= total

    if (err) {
      listObj.value.finished = true
    }

    // 加载状态停止
    listObj.value.loading = false
  }
  // 删除列表项
  const removeListItemByIndex = (index: number) => {
    listObj.value.list.splice(index, 1)
  }
  // 更新列表项
  const updateListItemByIndex = (index: number, item: never) => {
    if (index > -1) {
      listObj.value.list[index] = item
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
    listObj,
    removeListItemByIndex,
    updateListItemByIndex,
    reset,
    getParamsVal,
  }
}
