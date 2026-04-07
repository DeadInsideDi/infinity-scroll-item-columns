'use client'

import { useAddItem } from '@/hooks/useAddItem'
import { useInfiniteScrollNonSelected } from '@/hooks/useInfiniteScrollNonSelected'
import { useUpdateSelectedItem } from '@/hooks/useUpdateSelectedItem'
import type { Item } from '@/types'
import { useState, type FC } from 'react'
import { Column } from '../Column'
import { ElementItem } from '../ElementItem'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import s from './Panel.module.scss'

export const LeftPanel: FC = () => {
	const [filterInput, setFilterInput] = useState<Item['id']>('')
	const [newItemId, setNewItemId] = useState<Item['id']>('')

	const { ref, query } =
		useInfiniteScrollNonSelected<HTMLDivElement>(filterInput)
	const { isFetching, hasNextPage } = query

	const { mutate: updateSelectedItem } = useUpdateSelectedItem()
	const { mutate: addItem } = useAddItem()

	const handleAddItem = () => {
		addItem(newItemId)
		setNewItemId('')
	}

	return (
		<div className={s.panel}>
			<div className={s.header}>
				<h2>All Items</h2>

				<Input
					name='filter'
					placeholder='Filter by ID...'
					value={filterInput}
					onChange={e => setFilterInput(e.target.value)}
				/>

				<div className={s.addNew}>
					<Input
						name='item'
						placeholder='New ID...'
						value={newItemId}
						onChange={e => setNewItemId(e.target.value)}
						onKeyDown={e => {
							if (e.key === 'Enter') handleAddItem()
						}}
					/>
					<Button
						onClick={handleAddItem}
						variant='outline'
					>
						Add
					</Button>
				</div>
			</div>

			<Column
				ItemComponent={ElementItem}
				isFetching={isFetching}
				hasNextPage={hasNextPage}
				ref={ref}
				onClick={(_, id) => updateSelectedItem({ id, selected: true })}
				selected={false}
				contain={filterInput}
			/>
		</div>
	)
}
