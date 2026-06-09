// =========================================
// 1. JSON:API Base Types (generic wrapper)
// =========================================

export interface ResourceIdentifier {
  id: string
  type: string
}

export interface Relationship {
  data: ResourceIdentifier | ResourceIdentifier[] | null
}

export interface ResourceObject<
  TType extends string,
  TAttributes,
  TRelationships = Record<string, never>,
> {
  type: TType
  id: string
  attributes: TAttributes
  relationships?: TRelationships
  links?: Record<string, string>
}

export interface ResponseMeta {
  count?: number
  [key: string]: unknown
}

export interface ListResponse<T> {
  data: T[]
  meta?: ResponseMeta
  links?: {
    first?: string
    next?: string
    prev?: string
    last?: string
  }
}

export interface SingleResponse<T, TIncluded = unknown> {
  data: T
  included?: TIncluded[]
}

// =========================================
// 2. Vehicle Types
// =========================================

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

/**
 * Attributes for a vehicle. Source: /vehicles and /vehicles/{id}
 */
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
  current_status: "INCOMING_AT" | "STOPPED_AT" | "IN_TRANSIT_TO"
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
export type VehicleListResponse = ListResponse<VehicleResource>
export type VehicleSingleResponse = SingleResponse<
  VehicleResource,
  RouteResource | TripResource
>

// =========================================
// 3. Route Types
// =========================================

/**
 * Attributes for a route. Source: /routes and /routes/{id}
 */
export interface RouteAttributes {
  type: 0 | 1 | 2 | 3 | 4
  text_color: string
  sort_order: number
  short_name: string
  long_name: string
  listed_route: boolean
  fare_class: string
  direction_names: (string | null)[] | null
  direction_destinations: (string | null)[] | null
  description: string
  color: string
}

export type RouteResource = ResourceObject<"route", RouteAttributes>
export type RouteListResponse = ListResponse<RouteResource>

// =========================================
// 4. Trip Types
// =========================================

/**
 * Attributes for a trip. Source: /trips and /trips/{id}
 */
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
export type TripListResponse = ListResponse<TripResource>

// =========================================
// 5. Query Param Types
// =========================================

export interface GetVehiclesParams {
  "filter[route]"?: string
  "filter[trip]"?: string
  "page[limit]"?: number
  "page[offset]"?: number
  include?: string
}

export interface GetRoutesParams {
  "filter[type]"?: string
  "page[limit]"?: number
  "page[offset]"?: number
}

export interface GetTripsParams {
  "filter[route]"?: string
  "page[limit]"?: number
  "page[offset]"?: number
}
