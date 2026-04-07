import { cn } from '@/lib/clsx'
import type { FC } from 'react'
import s from './Button.module.scss'

type ButtonProps = React.ComponentProps<'button'> & {
	variant?: 'default' | 'outline' | 'secondary'
}
export const Button: FC<ButtonProps> = ({ className, ...props }) => {
	return (
		<button
			className={cn(s.button, s[props.variant || 'default'], className)}
			{...props}
		/>
	)
}
