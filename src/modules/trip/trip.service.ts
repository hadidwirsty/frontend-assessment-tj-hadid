import { mbtaClient } from "@/shared"

import type { GetTripsParams } from "./types/trip.dto"
import type { TripListResponse } from "./types/trip.response"

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
