import { useQuery } from '@tanstack/react-query'
import { getItemAnalytics } from '@/modules/items/services/get-item-analytics.service'

type UseItemAnalyticsOptions = {
  enabled?: boolean
}

export function useItemAnalytics(options?: UseItemAnalyticsOptions) {
  return useQuery({
    queryKey: ['items', 'analytics'],
    queryFn: getItemAnalytics,
    enabled: options?.enabled ?? true,
  })
}
