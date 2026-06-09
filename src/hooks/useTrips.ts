import { useInfiniteList } from "./useInfiniteList"
import { getTrips, type TripResource } from "@/modules/trip"

export function useTrips(routeIds?: string[]) {
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
