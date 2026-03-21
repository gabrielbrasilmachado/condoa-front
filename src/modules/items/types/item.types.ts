export type ItemStatus = 'available' | 'donated' | 'expired'

export type Item = {
  id: string
  name: string
  description: string
  status: ItemStatus
  categoryId: string
}
