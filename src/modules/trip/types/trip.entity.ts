import type { ResourceObject } from "@/shared"

export interface TripAttributes {
  wheelchair_accessible: 0 | 1 | 2
  revenue_status: "REVENUE" | "NON_REVENUE" | string
  name: string
  headsign: string
  direction_id: 0 | 1
  block_id: string
  bikes_allowed: 0 | 1 | 2
}

export type TripResource = ResourceObject<"trip", TripAttributes>
