import { useInfiniteList } from "./useInfiniteList"
import { getRoutes } from "../services/mbta"
import type { RouteResource } from "../types/mbta"

export function useRoutes() {
  return useInfiniteList<RouteResource>({
    queryKey: ["routes"],
    fetchFn: async ({ pageParam, signal }) => {
      return getRoutes(
        {
          "page[limit]": 20,
          "page[offset]": (pageParam - 1) * 20,
        },
        signal
      )
    },
    limit: 20,
  })
}
