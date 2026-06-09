import type { Relationship, ResourceObject } from "@/shared"

export interface Carriage {
  occupancy_status?:
    | "EMPTY"
    | "MANY_SEATS_AVAILABLE"
    | "FEW_SEATS_AVAILABLE"
    | "STANDING_ROOM_ONLY"
    | "CRUSHED_STANDING_ROOM_ONLY"
    | "FULL"
    | "NOT_ACCEPTING_PASSENGERS"
    | "NO_DATA_AVAILABLE"
    | "NOT_BOARDABLE"
  occupancy_percentage?: number
  label?: string
}

export type VehicleCurrentStatus =
  | "INCOMING_AT"
  | "STOPPED_AT"
  | "IN_TRANSIT_TO"

export interface VehicleAttributes {
  updated_at: string
  speed: number | null
  revenue_status: "REVENUE" | "NON_REVENUE" | string
  occupancy_status:
    | "MANY_SEATS_AVAILABLE"
    | "FEW_SEATS_AVAILABLE"
    | "FULL"
    | "NO_DATA_AVAILABLE"
    | null
  longitude: number
  latitude: number
  label: string
  direction_id: 0 | 1
  current_stop_sequence: number
  current_status: VehicleCurrentStatus
  carriages: Carriage[] | null
  bearing: number
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
