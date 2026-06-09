import { useQuery } from "@tanstack/react-query"
import { getVehicleDetail } from "../services/mbta"
import type {
  RouteResource,
  TripResource,
  VehicleResource,
} from "../types/mbta"

export function useVehicleDetail(id: string | null) {
  return useQuery({
    queryKey: ["vehicle", id],
    queryFn: async ({ signal }) => {
      if (!id) return null
      const response = await getVehicleDetail(id, signal)

      const vehicle: VehicleResource = response.data
      let route: RouteResource | undefined
      let trip: TripResource | undefined

      if (response.included) {
        route = response.included.find(
          (inc) => inc.type === "route"
        ) as RouteResource
        trip = response.included.find(
          (inc) => inc.type === "trip"
        ) as TripResource
      }

      return { vehicle, route, trip }
    },
    enabled: !!id,
  })
}
