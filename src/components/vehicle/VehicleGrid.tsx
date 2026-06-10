import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { AlertCircle, Bus } from "lucide-react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Pagination } from "@/components/Pagination"
import {
  VehicleCard,
  VehicleCardSkeleton,
} from "@/components/vehicle/VehicleCard"
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
      <ScrollArea className="min-h-0 flex-1" scrollFade>
        <div className="grid grid-cols-1 gap-4 pb-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
            <div className="col-span-full py-4 text-center text-sm text-muted-foreground">
              Memuat data...
            </div>
          )}
        </div>
      </ScrollArea>

      {!loading && vehicles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <Bus className="mb-4 h-12 w-12 opacity-20" />
          <h3 className="text-lg font-medium">Tidak ada kendaraan ditemukan</h3>
          <p className="text-sm">
            Coba ubah filter atau kriteria pencarian Anda.
          </p>
        </div>
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
