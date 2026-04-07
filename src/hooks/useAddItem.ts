import { addItemFetch } from '@/services/api/items/add-one'
import type { Item } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAddItem = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (id: Item['id']) => addItemFetch(id),

		onMutate: async id => {
			await queryClient.cancelQueries({ queryKey: ['items', 'id', id] })

			queryClient.setQueryData<Item>(['items', 'id', id], {
				id,
				selected: false,
				order: 0,
			})
		},
		onError: (_, id) => {
			queryClient.removeQueries({ queryKey: ['items', 'id', id] })
		},
		onSettled: async (res, _err, id) => {
			const resItem = res?.item
			if (resItem) queryClient.setQueryData(['items', 'id', id], resItem)
		},
	})
}
