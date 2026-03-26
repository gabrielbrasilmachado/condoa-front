export type ItemAnalyticsStatus = {
  available: number
  donated: number
  expired: number
}

export type ItemAnalyticsCategory = {
  id: string
  name: string
  count: number
}

export type ItemAnalyticsResponse = {
  status: ItemAnalyticsStatus
  categories: ItemAnalyticsCategory[]
}
