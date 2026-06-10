import { format } from "date-fns"
import { id } from "date-fns/locale"
import type { VehicleResource } from "@/modules/vehicle"

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
        return "bg-blue-50 text-blue-700"
      case "STOPPED_AT":
        return "bg-green-50 text-green-700"
      case "INCOMING_AT":
        return "bg-yellow-50 text-yellow-700"
      default:
        return "bg-gray-50 text-gray-700"
    }
  }

  const formattedDate = updated_at
    ? format(new Date(updated_at), "dd MMM yyyy, HH:mm", { locale: id })
    : "-"

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl border border-l-6 border-primary/20 bg-card text-card-foreground shadow-sm transition-colors hover:bg-muted/50"
    >
      <div className="space-y-6 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="leading-none font-semibold tracking-tight">
              {label || vehicle.id}
            </h3>
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
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Lat: {latitude} - Lng: {longitude}
          </p>
        </div>
        <div className="text-xs text-muted-foreground">
          Diperbarui: {formattedDate}
        </div>
      </div>
    </div>
  )
}
