export type ItemStatus = 'available' | 'donated' | 'expired'

export type ItemCategory = {
  id: string
  name: string
}

export type ItemImage = {
  id: string
  url: string
  is_primary: boolean
  created_at: string
}

export type ItemOwner = {
  id: string
  name: string
  phone?: string
}

export type Item = {
  id: string
  name: string
  description: string
  status: ItemStatus
  expired_at: string | null
  created_at: string
  updated_at: string
  category: ItemCategory
  images: ItemImage[]
  user: ItemOwner
}

export type ItemDetailsImage = {
  id: string
  itemId: string
  url: string
  mimeType: string
  size: number
  originalName: string
  isPrimary: boolean
  createdAt: string
}

export type ItemDetailsOwner = {
  id: string
  name: string
  phone: string
}

export type ItemDetails = {
  id: string
  name: string
  description: string
  status: ItemStatus
  expiredAt: string | null
  categoryId: string
  userId: string
  createdAt: string
  updatedAt: string
  category: ItemCategory
  user: ItemDetailsOwner
  images: ItemDetailsImage[]
}

export type ListItemsParams = {
  page: number
  perPage: number
  categoryId?: string
  status?: ItemStatus
  sortBy: 'createdAt'
  sortOrder: 'asc' | 'desc'
}

export type ListItemsResponse = {
  data: Item[]
  meta: {
    page: number
    perPage: number
    total: number
    totalPages: number
  }
  filters: {
    categoryId?: string
    status?: ItemStatus
  }
  sort: {
    sortBy: 'createdAt'
    sortOrder: 'asc' | 'desc'
  }
}
