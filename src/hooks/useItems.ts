import type { FilterOptions, Item } from '@/types'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export const useItems = ({
	selected = false,
	contain = '',
}: Partial<FilterOptions> = {}) => {
	const queryClient = useQueryClient()
	const [items, setItems] = useState<Item[]>([])
	const [processedItems, setProcessedItems] = useState<Item[]>([])

	useEffect(() => {
		const updateIds = () => {
			const allQueries = queryClient.getQueriesData<Item>({
				queryKey: ['items', 'id'],
			})

			const validItems = allQueries
				.map(([_, item]) => item)
				.filter(item => !!item)
			setItems(validItems)
		}

		updateIds()
		const unsubscribe = queryClient.getQueryCache().subscribe(event => {
			const { queryKey } = event.query
			if (queryKey[0] === 'items' && queryKey[1] === 'id') updateIds()
		})

		return () => unsubscribe()
	}, [queryClient])

	useEffect(() => {
		const filteredItems = items.filter(
			item => item.selected === selected && item.id.includes(contain),
		)
		if (selected) {
			setProcessedItems(filteredItems.sort((a, b) => a.order - b.order))
		} else {
			setProcessedItems(filteredItems)
		}
	}, [items, selected, contain])

	return processedItems
}
