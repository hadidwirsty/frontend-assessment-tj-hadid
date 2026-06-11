import { useInfiniteList } from "./useInfiniteList"
import { getTrips } from "@/modules/trip"

import type { TripResource } from "@/modules/trip"

export function useTrips(routeIds?: string[]): {
  items: TripResource[]
  loading: boolean
  hasMore: boolean
  error: unknown
  sentinelRef: (node: HTMLElement | null) => void
} {
  const isEnabled = !!routeIds && routeIds.length > 0

  return useInfiniteList<TripResource>({
    queryKey: ["trips", routeIds?.join(",") || ""],
    fetchFn: async ({ pageParam, signal }) => {
      const params: Record<string, string | number> = {
        "page[limit]": 20,
        "page[offset]": (pageParam - 1) * 20,
      }

      if (routeIds && routeIds.length > 0) {
        params["filter[route]"] = routeIds.join(",")
      }

      return getTrips(params, signal)
    },
    limit: 20,
    enabled: isEnabled,
  })
}
