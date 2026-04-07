export interface Item {
	id: string
	selected: boolean
	order: number
}

export type ItemQueryRequest = {
	filter?: string
	limit?: number
	cursor?: number
}

export type GetItemResponse = {
	items: Item[]
	cursor?: number
}

export type UpdateItemResponse = {
	item?: Item
	error?: string
}

export type FilterOptions = {
	selected: boolean
	contain: string
}
