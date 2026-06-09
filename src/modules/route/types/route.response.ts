import type { ListResponse, SingleResponse } from "@/shared"
import type { RouteResource } from "./route.entity"

export type RouteListResponse = ListResponse<RouteResource>
export type RouteSingleResponse = SingleResponse<RouteResource>
