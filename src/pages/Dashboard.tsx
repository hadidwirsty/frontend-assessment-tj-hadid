import { useSearchParams } from "react-router-dom"

import { FilterBar } from "@/components/filters/FilterBar"
import { VehicleGrid } from "@/components/vehicle/VehicleGrid"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

export function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams()

  const selectedRouteIds = searchParams.getAll("route")
  const selectedTripIds = searchParams.getAll("trip")

  const handleRoutesChange = (routes: string[]) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)
      newParams.delete("route")
      routes.forEach((route) => newParams.append("route", route))
      newParams.set("page", "1")
      return newParams
    })
  }

  const handleTripsChange = (trips: string[]) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)
      newParams.delete("trip")
      trips.forEach((trip) => newParams.append("trip", trip))
      newParams.set("page", "1")
      return newParams
    })
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <header className="shrink-0 border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2 text-primary">
            <img
              src="/favicon.svg"
              alt="Transjakarta Logo"
              className="size-6"
            />
            <h1 className="text-xl font-bold tracking-tight">
              Transjakarta Fleet
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto flex min-h-0 flex-1 flex-col px-4 py-4 sm:py-8">
        <div className="mb-6 flex shrink-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Status Armada</h2>
            <p className="text-muted-foreground">
              Pantau lokasi dan status kendaraan secara real-time.
            </p>
          </div>

          <FilterBar
            selectedRouteIds={selectedRouteIds}
            selectedTripIds={selectedTripIds}
            onChangeRoutes={handleRoutesChange}
            onChangeTrips={handleTripsChange}
          />
        </div>

        <VehicleGrid />
      </main>
    </div>
  )
}
