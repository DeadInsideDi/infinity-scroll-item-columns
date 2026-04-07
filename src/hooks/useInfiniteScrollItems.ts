import { DEBOUNCE_DELAY, INITIAL_QUERY_PARAMS } from '@/services/api/baseApi'
import type { GetItemResponse } from '@/types'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDebounce } from './useDebounce'
import { useInView } from './useInView'

interface InfiniteScrollOptions {
	filter?: string
	limit?: number
	debounceDelay?: number
}

type PageParam = {
	filter: string
	limit: number
	skip: number
}

export const useInfiniteScrollItems = <T extends HTMLElement>(
	fetchFn: (pageParam: PageParam) => Promise<GetItemResponse>,
	queryKeyBase: string | string[],
	{
		filter = INITIAL_QUERY_PARAMS.filter,
		limit = INITIAL_QUERY_PARAMS.limit,
		debounceDelay = DEBOUNCE_DELAY,
	}: InfiniteScrollOptions = {},
) => {
	const queryClient = useQueryClient()
	const { ref, inView } = useInView<T>()
	const debouncedFilter = useDebounce(filter, debounceDelay)

	const queryKey = [queryKeyBase, debouncedFilter].flat()

	const query = useInfiniteQuery({
		queryKey,
		queryFn: async ({ pageParam }) => {
			const res = await fetchFn(pageParam)
			res.items.forEach((item: any) => {
				queryClient.setQueryData(['items', 'id', item.id], item)
			})
			return res
		},
		initialPageParam: { filter: debouncedFilter, limit, skip: 0 },
		getNextPageParam: ({ skip }) => {
			if (skip === undefined) return undefined
			return { skip, limit, filter: debouncedFilter }
		},
		select: data => data.pages.flatMap(page => page.items),
	})

	const { hasNextPage, fetchNextPage, data } = query

	useEffect(() => {
		if (inView && hasNextPage) fetchNextPage()
	}, [inView, hasNextPage, fetchNextPage])

	return { ref, data, query }
}
