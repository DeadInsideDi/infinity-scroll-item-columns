import type { Item, UpdateItemResponse } from '@/types'
import { axiosInstance } from '../baseApi'

export const updateSelectedItemFetch = async (
	id: Item['id'],
	selected: Item['selected'],
) => {
	const { data } = await axiosInstance.post<UpdateItemResponse>(
		'/items/update-selected',
		{ id, selected },
	)
	return data
}
