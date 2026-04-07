import axios from 'axios'
import type { ItemQueryRequest } from '../../types'

export const axiosInstance = axios.create({
	baseURL: 'http://localhost:3001/api',
	headers: {
		'Content-Type': 'application/json',
	},
})

export const INITIAL_QUERY_PARAMS: Required<ItemQueryRequest> = {
	filter: '',
	limit: 20,
	cursor: 0,
}

export const DEBOUNCE_DELAY = 250
