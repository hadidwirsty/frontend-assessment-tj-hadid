import { Suspense, lazy, useEffect } from "react"
import { X, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"

import { useVehicleDetail } from "@/hooks/useVehicleDetail"

const VehicleMap = lazy(() =>
  import("../map/VehicleMap").then((module) => ({
    default: module.VehicleMap,
  }))
)

interface VehicleDetailModalProps {
  vehicleId: string
  onClose: () => void
}

export function VehicleDetailModal({
  vehicleId,
  onClose,
}: VehicleDetailModalProps) {
  const { data, isLoading, error } = useVehicleDetail(vehicleId)

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="relative w-full max-w-lg rounded-xl bg-background p-6 shadow-lg">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex flex-col items-center justify-center py-8 text-destructive">
            <AlertCircle className="mb-4 h-10 w-10" />
            <h3 className="text-lg font-semibold">Gagal Memuat Detail</h3>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-background shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Detail Kendaraan</h2>
          <button
            onClick={onClose}
            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {isLoading || !data ? (
            <div className="space-y-4">
              <div className="h-8 w-1/3 animate-pulse rounded bg-muted" />
              <div className="h-4 w-1/4 animate-pulse rounded bg-muted" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="h-20 animate-pulse rounded bg-muted" />
                <div className="h-20 animate-pulse rounded bg-muted" />
              </div>
              <div className="h-64 w-full animate-pulse rounded bg-muted" />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">
                    {data.vehicle.attributes.label || data.vehicle.id}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Terakhir diperbarui:{" "}
                    {data.vehicle.attributes.updated_at
                      ? format(
                          new Date(data.vehicle.attributes.updated_at),
                          "dd MMMM yyyy, HH:mm:ss",
                          { locale: id }
                        )
                      : "-"}
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                  {data.vehicle.attributes.current_status?.replace(/_/g, " ")}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <div className="text-sm font-medium text-muted-foreground">
                    Rute
                  </div>
                  <div className="mt-1 font-semibold">
                    {data.route?.attributes.long_name ||
                      data.route?.attributes.short_name ||
                      "-"}
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="text-sm font-medium text-muted-foreground">
                    Trip
                  </div>
                  <div className="mt-1 font-semibold">
                    {data.trip?.attributes.headsign ||
                      data.trip?.attributes.name ||
                      "-"}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-medium">Lokasi Saat Ini</h4>
                <Suspense
                  fallback={
                    <div className="flex h-64 w-full animate-pulse items-center justify-center rounded-md bg-muted text-muted-foreground">
                      Memuat Peta...
                    </div>
                  }
                >
                  <VehicleMap
                    lat={data.vehicle.attributes.latitude}
                    lng={data.vehicle.attributes.longitude}
                    label={data.vehicle.attributes.label || data.vehicle.id}
                  />
                </Suspense>
                <div className="mt-2 text-xs text-muted-foreground">
                  Koordinat: {data.vehicle.attributes.latitude},{" "}
                  {data.vehicle.attributes.longitude}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
