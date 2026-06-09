import type { ListResponse, SingleResponse } from "@/shared"
import type { RouteResource } from "@/modules/route"
import type { TripResource } from "@/modules/trip"
import type { VehicleResource } from "./vehicle.entity"

export type VehicleListResponse = ListResponse<VehicleResource>
export type VehicleSingleResponse = SingleResponse<
  VehicleResource,
  RouteResource | TripResource
>
