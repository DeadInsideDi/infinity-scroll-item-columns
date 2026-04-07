import { useCallback, useRef, useState } from 'react'

export const useInView = <T extends HTMLElement>(
	options?: IntersectionObserverInit,
) => {
	const [inView, setInView] = useState(false)

	const observer = useRef<IntersectionObserver>(null)

	const ref = useCallback(
		(node: T) => {
			if (observer.current) observer.current.disconnect()

			observer.current = new IntersectionObserver(entries => {
				setInView(entries[0].isIntersecting)
			}, options)

			if (node) observer.current.observe(node)
		},
		[options],
	)

	return { ref, inView }
}
