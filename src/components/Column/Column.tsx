'use client'

import { useItems } from '@/hooks/useItems'
import type { FilterOptions, Item } from '@/types'
import { type FC } from 'react'
import { ElementItem } from '../ElementItem'
import s from './Column.module.scss'

type ColumnProps = {
	ref: React.Ref<HTMLDivElement>
	onClick?: (event: React.MouseEvent, id: Item['id']) => void
	isFetching: boolean
	hasNextPage: boolean
	ItemComponent: React.ElementType
	selected: FilterOptions['selected']
	contain: FilterOptions['contain']
}

export const Column: FC<ColumnProps> = ({
	ref,
	onClick,
	isFetching,
	hasNextPage,
	ItemComponent = ElementItem,
	selected,
	contain,
}) => {
	const items = useItems({ selected, contain })

	return (
		<div className={s.column}>
			{items.map(item => (
				<ItemComponent
					key={item.id}
					id={item.id}
					onClick={(e: React.MouseEvent) => onClick?.(e, item.id)}
				/>
			))}

			<div
				className={s.info}
				ref={hasNextPage ? ref : undefined}
			>
				{isFetching
					? 'Loading...'
					: hasNextPage
						? 'Scroll for more...'
						: 'No more items'}
			</div>
		</div>
	)
}
