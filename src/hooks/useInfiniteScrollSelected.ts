import { getSelectedItemsFetch } from '@/services/api/items/get-selected'
import { useInfiniteScrollItems } from './useInfiniteScrollItems'

export const useInfiniteScrollSelected = <T extends HTMLElement>(
	filter?: string,
	limit?: number,
	debounceDelay?: number,
) => {
	return useInfiniteScrollItems<T>(
		getSelectedItemsFetch,
		['items', 'selected'],
		{ filter, limit, debounceDelay },
	)
}
