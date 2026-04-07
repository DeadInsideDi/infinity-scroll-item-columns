import type { Item, UpdateItemResponse } from '@/types'
import { axiosInstance } from '../baseApi'

export const updateOrderItemFetch = async (
	id: Item['id'],
	order: Item['order'],
) => {
	const { data } = await axiosInstance.put<UpdateItemResponse>(
		'/items/update-order',
		{ id, order },
	)
	return data
}
