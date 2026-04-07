'use client'

import { useInfiniteScrollSelected } from '@/hooks/useInfiniteScrollSelected'
import { useUpdateOrderItem } from '@/hooks/useUpdateOrderItem'
import { useUpdateSelectedItem } from '@/hooks/useUpdateSelectedItem'
import type { Item } from '@/types'
import type { DragEndEvent } from '@dnd-kit/core'
import { useQueryClient } from '@tanstack/react-query'
import { useState, type FC } from 'react'
import { SortableColumn } from '../SortableColumn'
import { Input } from '../ui/Input'
import s from './Panel.module.scss'

export const RightPanel: FC = () => {
	const [filterInput, setFilterInput] = useState('')

	const quetyClient = useQueryClient()
	const { ref, query } = useInfiniteScrollSelected<HTMLDivElement>(filterInput)
	const { isFetching, hasNextPage } = query

	const { mutate: updateSelectedItem } = useUpdateSelectedItem()
	const { mutate: updateOrderItem } = useUpdateOrderItem()

	const handleDragEnd = ({ active, over }: DragEndEvent) => {
		const activeId = String(active.id || '')
		const overId = String(over?.id || '')

		if (activeId === overId)
			return updateSelectedItem({ id: activeId, selected: false })

		const activeItem = quetyClient.getQueryData<Item>(['items', 'id', activeId])
		const overItem = quetyClient.getQueryData<Item>(['items', 'id', overId])

		if (activeItem) updateOrderItem({ id: overId, order: activeItem.order })
		if (overItem) updateOrderItem({ id: activeId, order: overItem.order || 0 })
	}

	return (
		<div className={s.panel}>
			<div className={s.header}>
				<h2>Selected Items</h2>

				<Input
					placeholder='Filter by ID...'
					value={filterInput}
					onChange={e => setFilterInput(e.target.value)}
				/>
			</div>

			<SortableColumn
				isFetching={isFetching}
				hasNextPage={hasNextPage}
				ref={ref}
				contain={filterInput}
				onDragEnd={handleDragEnd}
			/>
		</div>
	)
}
