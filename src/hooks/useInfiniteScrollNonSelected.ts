import { getNonSelectedItemsFetch } from '@/services/api/items/get-non-selected'
import { useInfiniteScrollItems } from './useInfiniteScrollItems'

export const useInfiniteScrollNonSelected = <T extends HTMLElement>(
	filter?: string,
	limit?: number,
	debounceDelay?: number,
) => {
	return useInfiniteScrollItems<T>(
		getNonSelectedItemsFetch,
		['items', 'non-selected'],
		{ filter, limit, debounceDelay },
	)
}
