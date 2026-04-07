import axios from 'axios'
import type { ItemQueryRequest } from '../../types'

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

export const INITIAL_QUERY_PARAMS: Required<ItemQueryRequest> = {
	filter: '',
	limit: 20,
	skip: 0,
}

export const DEBOUNCE_DELAY = 350
