import axios from "axios"
import type {
  GetRoutesParams,
  GetTripsParams,
  GetVehiclesParams,
  RouteListResponse,
  TripListResponse,
  VehicleListResponse,
  VehicleSingleResponse,
} from "../types/mbta"

const baseURL = import.meta.env.VITE_MBTA_BASE_URL || "https://api-v3.mbta.com"

const mbtaClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const getVehicles = async (
  params?: GetVehiclesParams,
  signal?: AbortSignal
): Promise<VehicleListResponse> => {
  const response = await mbtaClient.get<VehicleListResponse>("/vehicles", {
    params,
    signal,
  })
  return response.data
}

export const getVehicleDetail = async (
  id: string,
  signal?: AbortSignal
): Promise<VehicleSingleResponse> => {
  const response = await mbtaClient.get<VehicleSingleResponse>(
    `/vehicles/${id}`,
    {
      params: { include: "route,trip" },
      signal,
    }
  )
  return response.data
}

export const getRoutes = async (
  params?: GetRoutesParams,
  signal?: AbortSignal
): Promise<RouteListResponse> => {
  const response = await mbtaClient.get<RouteListResponse>("/routes", {
    params,
    signal,
  })
  return response.data
}

export const getTrips = async (
  params?: GetTripsParams,
  signal?: AbortSignal
): Promise<TripListResponse> => {
  const response = await mbtaClient.get<TripListResponse>("/trips", {
    params,
    signal,
  })
  return response.data
}
