import type { VehicleResource } from "@/modules/vehicle"
import { getVehicleStatusColor, formatVehicleDate } from "@/lib/utils"

interface VehicleCardProps {
  vehicle: VehicleResource
  onClick: () => void
}

export function VehicleCard({ vehicle, onClick }: VehicleCardProps) {
  const { current_status, label, latitude, longitude, updated_at } =
    vehicle.attributes

  const formattedDate = formatVehicleDate(updated_at)

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
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getVehicleStatusColor(
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
