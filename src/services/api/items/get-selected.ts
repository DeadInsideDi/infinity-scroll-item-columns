import type { GetItemResponse, ItemQueryRequest } from '@/types'
import { axiosInstance, INITIAL_QUERY_PARAMS } from '../baseApi'

export const getSelectedItemsFetch = async (
	query: ItemQueryRequest = INITIAL_QUERY_PARAMS,
) => {
	const { data } = await axiosInstance.get<GetItemResponse>('/items/selected', {
		params: query,
	})
	return data
}
