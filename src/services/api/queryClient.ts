import { keepPreviousData, QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
			gcTime: 5 * 60 * 1000,
			retryDelay: 3 * 1000,
			retry: 1,
			placeholderData: keepPreviousData,
		},
	},
})
