import axios from "axios"
import type {
  MBTAListResponse,
  RouteResource,
  TripResource,
  VehicleResource,
} from "../types/mbta"

const baseURL = import.meta.env.VITE_MBTA_BASE_URL || "https://api-v3.mbta.com"

const mbtaClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

export interface GetVehiclesParams {
  "filter[route]"?: string
  "filter[trip]"?: string
  "page[limit]"?: number
  "page[offset]"?: number
}

export const getVehicles = async (
  params?: GetVehiclesParams,
  signal?: AbortSignal
): Promise<MBTAListResponse<VehicleResource>> => {
  const response = await mbtaClient.get<MBTAListResponse<VehicleResource>>(
    "/vehicles",
    { params, signal }
  )
  return response.data
}

export const getVehicleDetail = async (
  id: string,
  signal?: AbortSignal
): Promise<import("../types/mbta").MBTAItemResponse<VehicleResource>> => {
  const response = await mbtaClient.get<
    import("../types/mbta").MBTAItemResponse<VehicleResource>
  >(`/vehicles/${id}`, {
    params: { include: "route,trip" },
    signal,
  })
  return response.data
}

export interface GetRoutesParams {
  "page[limit]"?: number
  "page[offset]"?: number
}

export const getRoutes = async (
  params?: GetRoutesParams,
  signal?: AbortSignal
): Promise<MBTAListResponse<RouteResource>> => {
  const response = await mbtaClient.get<MBTAListResponse<RouteResource>>(
    "/routes",
    { params, signal }
  )
  return response.data
}

export interface GetTripsParams {
  "filter[route]"?: string
  "page[limit]"?: number
  "page[offset]"?: number
}

export const getTrips = async (
  params?: GetTripsParams,
  signal?: AbortSignal
): Promise<MBTAListResponse<TripResource>> => {
  const response = await mbtaClient.get<MBTAListResponse<TripResource>>(
    "/trips",
    { params, signal }
  )
  return response.data
}
