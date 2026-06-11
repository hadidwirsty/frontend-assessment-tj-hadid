import { Suspense, lazy, useEffect } from "react"

import { Accessibility, AlertCircle, Bike, ChevronDown, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { Meter } from "@/components/ui/meter"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"

import { VehicleDetailSkeleton } from "@/components/vehicle/VehicleDetailSkeleton"

import { useVehicleDetail } from "@/hooks/useVehicleDetail"
import {
  bearingToCompass,
  formatVehicleDate,
  getOccupancyLabel,
  getOccupancyVariant,
  getVehicleStatusVariant,
  speedToKmh,
} from "@/lib/utils"

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

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
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-shrink-0 items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Detail Kendaraan</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-sm opacity-70 transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {isLoading || !data ? (
            <VehicleDetailSkeleton />
          ) : (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">
                    {data.vehicle.attributes.label || data.vehicle.id}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Terakhir diperbarui:{" "}
                    {formatVehicleDate(
                      data.vehicle.attributes.updated_at,
                      "dd MMMM yyyy, HH:mm:ss"
                    )}
                  </p>
                </div>
                <Badge
                  variant={getVehicleStatusVariant(
                    data.vehicle.attributes.current_status
                  )}
                >
                  {data.vehicle.attributes.current_status?.replace(/_/g, " ")}
                </Badge>
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
                    <Skeleton className="flex h-64 w-full flex-col items-center justify-center gap-2 text-muted-foreground">
                      <Spinner className="size-6 text-primary" />
                      <span>Memuat Peta...</span>
                    </Skeleton>
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

              {/* SECTION A: Informasi Pergerakan */}
              <div>
                <h4 className="mb-3 border-b pb-2 text-sm font-medium">
                  Informasi Pergerakan
                </h4>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {data.vehicle.attributes.bearing !== null && (
                    <div>
                      <div className="text-xs text-muted-foreground">Arah</div>
                      <div className="text-sm font-medium">
                        {bearingToCompass(data.vehicle.attributes.bearing)} (
                        {data.vehicle.attributes.bearing}&deg;)
                      </div>
                    </div>
                  )}
                  {data.vehicle.attributes.speed !== null && (
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Kecepatan
                      </div>
                      <div className="text-sm font-medium">
                        {speedToKmh(data.vehicle.attributes.speed)}
                      </div>
                    </div>
                  )}
                  {data.vehicle.attributes.current_stop_sequence !== null && (
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Urutan Halte
                      </div>
                      <div className="text-sm font-medium">
                        {data.vehicle.attributes.current_stop_sequence}
                      </div>
                    </div>
                  )}
                  {data.vehicle.attributes.revenue !== null && (
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Status Operasi
                      </div>
                      <div className="mt-1">
                        {data.vehicle.attributes.revenue === "REVENUE" ? (
                          <Badge variant="success">Beroperasi</Badge>
                        ) : (
                          <Badge variant="secondary">Non-Operasional</Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* SECTION B & C Wrapper */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* SECTION B: Detail Rute */}
                <div>
                  <h4 className="mb-3 border-b pb-2 text-sm font-medium">
                    Detail Rute
                  </h4>
                  {data.route ? (
                    <div className="space-y-3">
                      <div>
                        <span
                          className="inline-flex items-center justify-center rounded-sm px-2 py-1 text-xs font-bold"
                          style={{
                            backgroundColor: `#${data.route.attributes.color || "ccc"}`,
                            color: `#${data.route.attributes.text_color || "000"}`,
                          }}
                        >
                          Rute {data.route.attributes.short_name || "-"}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Nama Rute
                        </div>
                        <div className="text-sm font-medium">
                          {data.route.attributes.long_name || "-"}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Tipe Layanan
                        </div>
                        <div className="text-sm font-medium">
                          {data.route.attributes.description || "-"}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Kelas Tarif
                        </div>
                        <div className="text-sm font-medium">
                          {data.route.attributes.fare_class || "-"}
                        </div>
                      </div>
                      {data.vehicle.attributes.direction_id !== null &&
                        data.route.attributes.direction_destinations && (
                          <div>
                            <div className="text-xs text-muted-foreground">
                              Arah Tujuan
                            </div>
                            <div className="text-sm font-medium">
                              {data.route.attributes.direction_destinations[
                                data.vehicle.attributes.direction_id
                              ] || "-"}
                            </div>
                          </div>
                        )}
                    </div>
                  ) : (
                    <Empty className="px-0 py-6">
                      <EmptyHeader>
                        <EmptyTitle className="text-base">
                          Rute Tidak Tersedia
                        </EmptyTitle>
                        <EmptyDescription>
                          Data rute tidak ditemukan untuk kendaraan ini.
                        </EmptyDescription>
                      </EmptyHeader>
                    </Empty>
                  )}
                </div>

                {/* SECTION C: Detail Trip */}
                <div>
                  <h4 className="mb-3 border-b pb-2 text-sm font-medium">
                    Detail Trip
                  </h4>
                  {data.trip ? (
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Tujuan (Headsign)
                        </div>
                        <div className="text-sm font-medium">
                          {data.trip.attributes.headsign || "-"}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Aksesibilitas
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          {data.trip.attributes.wheelchair_accessible === 1 ? (
                            <Badge variant="info" className="gap-1.5">
                              <Accessibility className="h-4 w-4" /> Dapat
                              diakses kursi roda
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Sepeda
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          {data.trip.attributes.bikes_allowed === 1 ? (
                            <Badge variant="info" className="gap-1.5">
                              <Bike className="h-4 w-4" /> Sepeda diizinkan
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Empty className="px-0 py-6">
                      <EmptyHeader>
                        <EmptyTitle className="text-base">
                          Trip Tidak Tersedia
                        </EmptyTitle>
                        <EmptyDescription>
                          Data perjalanan tidak ditemukan.
                        </EmptyDescription>
                      </EmptyHeader>
                    </Empty>
                  )}
                </div>
              </div>

              {/* SECTION D: Informasi Gerbong */}
              {data.vehicle.attributes.carriages &&
                data.vehicle.attributes.carriages.length > 0 && (
                  <Collapsible>
                    <CollapsibleTrigger className="group flex w-full items-center justify-between border-b pb-2">
                      <h4 className="text-sm font-medium">
                        Informasi Gerbong (
                        {data.vehicle.attributes.carriages.length} gerbong)
                      </h4>
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-3 pt-3">
                        {data.vehicle.attributes.carriages.map(
                          (carriage, idx) => (
                            <div
                              key={idx}
                              className="flex flex-col gap-3 rounded-lg border p-3"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                  {carriage.label || `Gerbong ${idx + 1}`}
                                </span>
                                {carriage.occupancy_status && (
                                  <Badge
                                    variant={getOccupancyVariant(
                                      carriage.occupancy_status
                                    )}
                                  >
                                    {getOccupancyLabel(
                                      carriage.occupancy_status
                                    )}
                                  </Badge>
                                )}
                              </div>
                              {carriage.occupancy_percentage !== null &&
                                carriage.occupancy_percentage !== undefined && (
                                  <div className="flex items-center gap-3">
                                    <Meter
                                      value={carriage.occupancy_percentage}
                                    />
                                    <span className="text-xs font-medium text-muted-foreground tabular-nums">
                                      {carriage.occupancy_percentage}%
                                    </span>
                                  </div>
                                )}
                            </div>
                          )
                        )}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
