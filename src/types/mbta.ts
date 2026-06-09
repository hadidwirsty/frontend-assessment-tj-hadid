/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MBTAListResponse<T> {
  data: T[]
  meta?: {
    count?: number
    [key: string]: any
  }
  links?: {
    first?: string
    next?: string
    prev?: string
    last?: string
  }
}

export interface MBTAItemResponse<T> {
  data: T
  included?: any[]
}

export interface ResourceRelationship {
  data: {
    id: string
    type: string
  } | null
}

export interface VehicleResource {
  type: "vehicle"
  id: string
  attributes: {
    bearing: number | null
    current_status: string | null
    current_stop_sequence: number | null
    direction_id: number | null
    label: string | null
    latitude: number
    longitude: number
    speed: number | null
    updated_at: string
  }
  relationships?: {
    route?: ResourceRelationship
    stop?: ResourceRelationship
    trip?: ResourceRelationship
  }
}

export interface RouteResource {
  type: "route"
  id: string
  attributes: {
    color: string
    description: string
    direction_destinations: string[]
    direction_names: string[]
    fare_class: string
    long_name: string
    short_name: string
    sort_order: number
    text_color: string
    type: number
  }
}

export interface TripResource {
  type: "trip"
  id: string
  attributes: {
    block_id: string
    direction_id: number
    headsign: string
    name: string
    wheelchair_accessible: number
  }
  relationships?: {
    route?: ResourceRelationship
  }
}
