import { format } from "date-fns"
import { id } from "date-fns/locale"
import type { VehicleResource } from "@/types/mbta"

interface VehicleCardProps {
  vehicle: VehicleResource
  onClick: () => void
}

export function VehicleCard({ vehicle, onClick }: VehicleCardProps) {
  const { current_status, label, latitude, longitude, updated_at } =
    vehicle.attributes

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "IN_TRANSIT_TO":
        return "bg-blue-100 text-blue-800"
      case "STOPPED_AT":
        return "bg-green-100 text-green-800"
      case "INCOMING_AT":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formattedDate = updated_at
    ? format(new Date(updated_at), "dd MMM yyyy, HH:mm", { locale: id })
    : "-"

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl border bg-card text-card-foreground shadow-sm transition-colors hover:bg-muted/50"
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="leading-none font-semibold tracking-tight">
              {label || vehicle.id}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Lat: {latitude}, Lng: {longitude}
            </p>
          </div>
          {current_status && (
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(
                current_status
              )}`}
            >
              {current_status.replace(/_/g, " ")}
            </span>
          )}
        </div>
        <div className="mt-4 text-xs text-muted-foreground">
          Diperbarui: {formattedDate}
        </div>
      </div>
    </div>
  )
}

export function VehicleCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          <div className="h-3 w-32 animate-pulse rounded bg-muted" />
        </div>
        <div className="h-5 w-20 animate-pulse rounded-full bg-muted" />
      </div>
      <div className="mt-4 h-3 w-40 animate-pulse rounded bg-muted" />
    </div>
  )
}
