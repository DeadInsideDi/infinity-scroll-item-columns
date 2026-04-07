import type { Item, UpdateItemResponse } from '@/types'
import { axiosInstance } from '../baseApi'

export const addItemFetch = async (id: Item['id']) => {
	const { data } = await axiosInstance.post<UpdateItemResponse>('/items', {
		id,
	})
	return data
}
