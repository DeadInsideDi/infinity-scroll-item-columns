import { updateOrderItemFetch } from '@/services/api/items/update-order'
import type { Item } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateOrderItem = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({ id, order }: Omit<Item, 'selected'>) =>
			updateOrderItemFetch(id, order),

		onMutate: async item => {
			await queryClient.cancelQueries({ queryKey: ['items', 'id', item.id] })
			const oldItem = queryClient.getQueryData<Item>(['items', 'id', item.id])

			queryClient.setQueryData<Item>(['items', 'id', item.id], {
				selected: true,
				...item,
			})

			return { oldItem }
		},
		onError: (_, item, context) => {
			queryClient.removeQueries({ queryKey: ['items', 'id', item.id] })

			const oldItem = context?.oldItem
			if (oldItem) queryClient.setQueryData(['items', 'id', item.id], oldItem)
		},
		onSettled: (res, _err, item) => {
			const resItem = res?.item
			if (resItem) queryClient.setQueryData(['items', 'id', item.id], resItem)
		},
	})
}
