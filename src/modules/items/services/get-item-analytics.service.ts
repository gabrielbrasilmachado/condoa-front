import { api } from '@/shared/lib/http/api'
import type { ItemAnalyticsResponse } from '@/modules/items/types/item-analytics.types'

export async function getItemAnalytics() {
  const { data } = await api.get<ItemAnalyticsResponse>('/items/analytics')
  return data
}
