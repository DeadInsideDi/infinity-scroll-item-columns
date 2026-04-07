import { cn } from '@/lib/clsx'
import type { FC } from 'react'
import { Button } from '../ui/Button'
import s from './ElementItem.module.scss'

type ElementItemProps = React.ComponentProps<'button'>

export const ElementItem: FC<ElementItemProps> = ({
	id,
	className,
	...props
}) => {
	return (
		<Button
			className={cn(s.item, className)}
			variant='secondary'
			{...props}
		>
			ID: {id}
		</Button>
	)
}
