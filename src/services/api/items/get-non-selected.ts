import type { GetItemResponse, ItemQueryRequest } from '../../../types'
import { axiosInstance, INITIAL_QUERY_PARAMS } from '../baseApi'

export const getNonSelectedItemsFetch = async (
	query: ItemQueryRequest = INITIAL_QUERY_PARAMS,
) => {
	const { data } = await axiosInstance.get<GetItemResponse>(
		'/items/non-selected',
		{
			params: query,
		},
	)
	return data
}
