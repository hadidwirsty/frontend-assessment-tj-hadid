import { mbtaClient } from "@/shared"

import type { GetRoutesParams } from "./types/route.dto"
import type { RouteListResponse } from "./types/route.response"

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
