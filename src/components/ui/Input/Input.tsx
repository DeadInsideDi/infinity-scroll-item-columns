import { cn } from '@/lib/clsx'
import type { FC } from 'react'
import s from './Input.module.scss'

export const Input: FC<React.ComponentProps<'input'>> = ({
	className,
	...props
}) => {
	return (
		<input
			className={cn(s.input, className)}
			{...props}
		/>
	)
}
