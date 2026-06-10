import { useRoutes } from "@/hooks/useRoutes"
import { useTrips } from "@/hooks/useTrips"
import { MultiSelectDropdown } from "./MultiSelectDropdown"

interface FilterBarProps {
  selectedRouteIds: string[]
  selectedTripIds: string[]
  onChangeRoutes: (routes: string[]) => void
  onChangeTrips: (trips: string[]) => void
  onResetAll: () => void
}

export function FilterBar({
  selectedRouteIds,
  selectedTripIds,
  onChangeRoutes,
  onChangeTrips,
  onResetAll,
}: FilterBarProps) {
  const {
    items: routes,
    loading: routesLoading,
    hasMore: routesHasMore,
    sentinelRef: routesSentinelRef,
  } = useRoutes()

  const {
    items: trips,
    loading: tripsLoading,
    hasMore: tripsHasMore,
    sentinelRef: tripsSentinelRef,
  } = useTrips(selectedRouteIds)

  const toggleRoute = (id: string) => {
    if (selectedRouteIds.includes(id)) {
      onChangeRoutes(selectedRouteIds.filter((r) => r !== id))
    } else {
      onChangeRoutes([...selectedRouteIds, id])
    }
  }

  const toggleTrip = (id: string) => {
    if (selectedTripIds.includes(id)) {
      onChangeTrips(selectedTripIds.filter((t) => t !== id))
    } else {
      onChangeTrips([...selectedTripIds, id])
    }
  }

  const clearRoutes = () => onChangeRoutes([])
  const clearTrips = () => onChangeTrips([])

  const hasAnyFilter = selectedRouteIds.length > 0 || selectedTripIds.length > 0

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <MultiSelectDropdown
        label="Pilih Rute"
        items={routes.map((r) => ({
          id: r.id,
          label: r.attributes.long_name || r.attributes.short_name || r.id,
        }))}
        selectedIds={selectedRouteIds}
        onToggle={toggleRoute}
        onClear={clearRoutes}
        loading={routesLoading}
        hasMore={routesHasMore}
        sentinelRef={routesSentinelRef}
      />

      <MultiSelectDropdown
        label={
          selectedRouteIds.length === 0
            ? "Pilih Trip (Pilih rute dulu)"
            : "Pilih Trip"
        }
        items={trips.map((t) => ({
          id: t.id,
          label: t.attributes.headsign || t.attributes.name || t.id,
        }))}
        selectedIds={selectedTripIds}
        onToggle={toggleTrip}
        onClear={clearTrips}
        loading={tripsLoading}
        hasMore={tripsHasMore}
        sentinelRef={tripsSentinelRef}
      />

      {hasAnyFilter && (
        <button
          onClick={onResetAll}
          className="text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          Reset Filter
        </button>
      )}
    </div>
  )
}
