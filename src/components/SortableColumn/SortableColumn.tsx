'use client'

import { useItems } from '@/hooks/useItems'
import { closestCenter, DndContext, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { type FC } from 'react'
import { Column } from '../Column'
import { SortableElementItem } from '../SortableElementItem/SortableElementItem'
import type { FilterOptions } from '@/types'

type SortableColumnProps = {
	ref: React.Ref<HTMLDivElement>
	onDragEnd: (event: DragEndEvent) => void
	isFetching: boolean
	hasNextPage: boolean
	contain: FilterOptions['contain']
}

export const SortableColumn: FC<SortableColumnProps> = ({
	ref,
	onDragEnd,
	isFetching,
	hasNextPage,
	contain,
}) => {
	const items = useItems({ selected: true, contain })

	return (
		<DndContext
			autoScroll={{ threshold: { x: 0, y: 0.2 } }}
			collisionDetection={closestCenter}
			onDragEnd={onDragEnd}
		>
			<SortableContext
				items={items.map(i => i.id)}
				strategy={verticalListSortingStrategy}
			>
				<Column
					ItemComponent={SortableElementItem}
					isFetching={isFetching}
					hasNextPage={hasNextPage}
					ref={ref}
					selected={true}
					contain={contain}
				/>
			</SortableContext>
		</DndContext>
	)
}
