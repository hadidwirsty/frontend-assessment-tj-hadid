import type { ResourceObject } from "@/shared"

export type RouteType = 0 | 1 | 2 | 3 | 4 // tram, subway, rail, bus, ferry

export interface RouteAttributes {
  type: RouteType
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
