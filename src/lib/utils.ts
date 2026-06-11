import { clsx } from "clsx"
import { format } from "date-fns"
import { id } from "date-fns/locale/id"
import { twMerge } from "tailwind-merge"

import type { ClassValue } from "clsx"

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function getVehicleStatusColor(
  status: string | null | undefined
): string {
  switch (status) {
    case "IN_TRANSIT_TO":
      return "bg-blue-50 text-blue-700"
    case "STOPPED_AT":
      return "bg-green-50 text-green-700"
    case "INCOMING_AT":
      return "bg-yellow-50 text-yellow-700"
    default:
      return "bg-gray-50 text-gray-700"
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

export function getOccupancyColor(status: OccupancyStatus | null): string {
  switch (status) {
    case "MANY_SEATS_AVAILABLE":
      return "bg-green-500"
    case "FEW_SEATS_AVAILABLE":
      return "bg-yellow-500"
    case "STANDING_ROOM_ONLY":
      return "bg-orange-500"
    case "FULL":
      return "bg-red-500"
    default:
      return "bg-gray-400"
  }
}
