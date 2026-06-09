import { useInfiniteList } from "./useInfiniteList"
import { getTrips } from "../services/mbta"
import type { TripResource } from "../types/mbta"

export function useTrips(routeIds?: string[]) {
  return useInfiniteList<TripResource>({
    queryKey: ["trips", routeIds],
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
  })
}
