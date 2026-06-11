import type { Relationship, ResourceObject } from "@/shared"

export type OccupancyStatus =
  | "MANY_SEATS_AVAILABLE"
  | "FEW_SEATS_AVAILABLE"
  | "STANDING_ROOM_ONLY"
  | "CRUSHED_STANDING_ROOM_ONLY"
  | "FULL"
  | "NOT_ACCEPTING_PASSENGERS"
  | "NO_DATA_AVAILABLE"

export interface VehicleCarriage {
  label: string
  occupancy_status: OccupancyStatus | null
  occupancy_percentage: number | null
}

export type VehicleCurrentStatus =
  | "INCOMING_AT"
  | "STOPPED_AT"
  | "IN_TRANSIT_TO"

export interface VehicleAttributes {
  updated_at: string
  speed: number | null
  revenue: "REVENUE" | "NON_REVENUE"
  occupancy_status: OccupancyStatus | null
  longitude: number
  latitude: number
  label: string
  direction_id: 0 | 1
  current_stop_sequence: number | null
  current_status: VehicleCurrentStatus
  carriages: VehicleCarriage[]
  bearing: number | null
}

export interface VehicleRelationships {
  route?: Relationship
  stop?: Relationship
  trip?: Relationship
}

export type VehicleResource = ResourceObject<
  "vehicle",
  VehicleAttributes,
  VehicleRelationships
>
