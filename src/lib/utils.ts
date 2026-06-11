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
