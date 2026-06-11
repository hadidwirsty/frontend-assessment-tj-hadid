import { clsx } from "clsx"
import { format } from "date-fns"
import { id } from "date-fns/locale/id"
import { twMerge } from "tailwind-merge"

import type { ClassValue } from "clsx"
import type { BadgeProps } from "@/components/ui/badge"

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function getVehicleStatusVariant(
  status: string | null | undefined
): BadgeProps["variant"] {
  switch (status) {
    case "IN_TRANSIT_TO":
      return "info"
    case "STOPPED_AT":
      return "success"
    case "INCOMING_AT":
      return "warning"
    default:
      return "secondary"
  }
}

export function formatVehicleDate(
  dateString: string | null | undefined,
  dateFormat = "dd MMM yyyy, HH:mm"
): string {
  if (!dateString) return "-"
  return format(new Date(dateString), dateFormat, { locale: id })
}

import type { OccupancyStatus } from "@/modules/vehicle/types/vehicle.entity"

export function bearingToCompass(bearing: number | null): string {
  if (bearing === null) return "-"
  const val = Math.floor(bearing / 22.5 + 0.5)
  const arr = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
  return arr[val % 8]
}

export function speedToKmh(speed: number | null): string {
  if (speed === null) return "-"
  return `${Math.round(speed * 3.6)} km/h`
}

export function getOccupancyLabel(status: OccupancyStatus | null): string {
  switch (status) {
    case "MANY_SEATS_AVAILABLE":
      return "Banyak Tempat Duduk"
    case "FEW_SEATS_AVAILABLE":
      return "Sedikit Tempat Duduk"
    case "STANDING_ROOM_ONLY":
      return "Hanya Berdiri"
    case "FULL":
      return "Penuh"
    default:
      return "Tidak Ada Data"
  }
}

export function getOccupancyVariant(
  status: OccupancyStatus | null
): BadgeProps["variant"] {
  switch (status) {
    case "MANY_SEATS_AVAILABLE":
      return "success"
    case "FEW_SEATS_AVAILABLE":
    case "STANDING_ROOM_ONLY":
      return "warning"
    case "FULL":
      return "destructive"
    default:
      return "secondary"
  }
}
