import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { AlertCircle, Bus } from "lucide-react"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Spinner } from "@/components/ui/spinner"
import { toastManager } from "@/components/ui/toast"
import { Pagination } from "@/components/Pagination"
import { VehicleCard } from "@/components/vehicle/VehicleCard"
import { VehicleCardSkeleton } from "@/components/vehicle/VehicleCardSkeleton"
import { VehicleDetailModal } from "@/components/vehicle/VehicleDetailModal"
import { useVehicles } from "@/hooks/useVehicles"

export function VehicleGrid() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null
  )

  const page = Number(searchParams.get("page")) || 1
  const [perPage, setPerPage] = useState(10)

  const routeIds = searchParams.getAll("route")
  const tripIds = searchParams.getAll("trip")

  const { vehicles, totalCount, loading, error } = useVehicles({
    page,
    perPage,
    routeIds,
    tripIds,
  })

  useEffect(() => {
    if (error) {
      toastManager.add({
        type: "error",
        title: "Gagal Memuat Data",
        description:
          error.message || "Terjadi kesalahan saat menghubungi server.",
      })
    }
  }, [error])

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)
      newParams.set("page", newPage.toString())
      return newParams
    })
  }

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage)
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)
      newParams.delete("perPage")
      newParams.set("page", "1")
      return newParams
    })
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-destructive">
        <AlertCircle className="mb-4 h-10 w-10" />
        <h3 className="text-lg font-semibold">Gagal Memuat Data</h3>
        <p className="text-sm text-muted-foreground">{error.message}</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col space-y-4 sm:space-y-6">
      {!loading && vehicles.length === 0 ? (
        <Empty className="flex-1">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Bus className="size-5" />
            </EmptyMedia>
            <EmptyTitle>Tidak ada kendaraan ditemukan</EmptyTitle>
            <EmptyDescription>
              Coba ubah filter atau kriteria pencarian Anda.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <ScrollArea className="min-h-0 flex-1" scrollFade>
          <div className="grid grid-cols-1 gap-4 pb-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {loading && vehicles.length === 0
              ? Array.from({ length: perPage }).map((_, i) => (
                  <VehicleCardSkeleton key={i} />
                ))
              : vehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    onClick={() => setSelectedVehicleId(vehicle.id)}
                  />
                ))}
            {loading && vehicles.length > 0 && (
              <div className="col-span-full flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
                <Spinner className="size-4" />
                <span>Memuat data...</span>
              </div>
            )}
          </div>
        </ScrollArea>
      )}

      {vehicles.length > 0 && (
        <div className="mt-auto shrink-0 pt-2 sm:pt-4">
          <Pagination
            currentPage={page}
            totalItems={totalCount}
            itemsPerPage={perPage}
            onPageChange={handlePageChange}
            onPerPageChange={handlePerPageChange}
          />
        </div>
      )}

      {selectedVehicleId && (
        <VehicleDetailModal
          vehicleId={selectedVehicleId}
          onClose={() => setSelectedVehicleId(null)}
        />
      )}
    </div>
  )
}
