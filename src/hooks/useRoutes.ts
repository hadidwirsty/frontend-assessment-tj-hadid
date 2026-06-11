import { useInfiniteList } from "./useInfiniteList"
import { getRoutes } from "@/modules/route"

import type { RouteResource } from "@/modules/route"

export function useRoutes(): {
  items: RouteResource[]
  loading: boolean
  hasMore: boolean
  error: unknown
  sentinelRef: (node: HTMLElement | null) => void
} {
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
