import type { ListResponse, SingleResponse } from "@/shared"
import type { TripResource } from "./trip.entity"

export type TripListResponse = ListResponse<TripResource>
export type TripSingleResponse = SingleResponse<TripResource>
