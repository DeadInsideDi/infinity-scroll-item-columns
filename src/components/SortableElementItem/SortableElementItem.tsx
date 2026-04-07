import type { Item } from '@/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { FC } from 'react'
import s from './SortableElementItem.module.scss'

type SortableElementItemProps = {
	id: Item['id']
}
export const SortableElementItem: FC<SortableElementItemProps> = ({ id }) => {
	const { attributes, listeners, setNodeRef, transition, transform } =
		useSortable({ id })

	return (
		<div
			className={s.item}
			style={{ transform: CSS.Transform.toString(transform), transition }}
			ref={setNodeRef}
			{...attributes}
			{...listeners}
		>
			ID: {id}
		</div>
	)
}
