import { mbtaClient } from "@/shared"

import type { GetVehiclesParams } from "./types/vehicle.dto"
import type {
  VehicleListResponse,
  VehicleSingleResponse,
} from "./types/vehicle.response"

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
