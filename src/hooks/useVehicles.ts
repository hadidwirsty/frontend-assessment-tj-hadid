import { useEffect, useRef } from "react"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { getVehicles } from "@/modules/vehicle"

interface UseVehiclesProps {
  page: number
  perPage: number
  routeIds?: string[]
  tripIds?: string[]
}

export const useVehicles = ({
  page,
  perPage,
  routeIds,
  tripIds,
}: UseVehiclesProps) => {
  const [, setSearchParams] = useSearchParams()
  const prevRouteIds = useRef(routeIds?.join(","))
  const prevTripIds = useRef(tripIds?.join(","))

  useEffect(() => {
    const currentRouteStr = routeIds?.join(",")
    const currentTripStr = tripIds?.join(",")

    if (
      prevRouteIds.current !== currentRouteStr ||
      prevTripIds.current !== currentTripStr
    ) {
      prevRouteIds.current = currentRouteStr
      prevTripIds.current = currentTripStr

      if (page !== 1) {
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev)
          newParams.set("page", "1")
          return newParams
        })
      }
    }
  }, [routeIds, tripIds, page, setSearchParams])

  const query = useQuery({
    queryKey: ["vehicles", { page, perPage, routeIds, tripIds }],
    queryFn: async ({ signal }) => {
      const params: Record<string, string | number> = {
        "page[offset]": (page - 1) * perPage,
        "page[limit]": perPage,
      }

      if (routeIds && routeIds.length > 0) {
        params["filter[route]"] = routeIds.join(",")
      }
      if (tripIds && tripIds.length > 0) {
        params["filter[trip]"] = tripIds.join(",")
      }

      return getVehicles(params, signal)
    },
  })

  return {
    vehicles: query.data?.data || [],
    totalCount: query.data?.meta?.count ?? 500,
    loading: query.isPending || query.isFetching,
    error: query.error,
  }
}
