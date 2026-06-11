import { Skeleton } from "@/components/ui/skeleton"

export function VehicleDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32 md:w-48" />
          <Skeleton className="h-4 w-40 md:w-56" />
        </div>
        <Skeleton className="h-6 w-24 rounded-sm" />
      </div>

      {/* Rute & Trip Simple Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2 rounded-lg border p-4">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="space-y-2 rounded-lg border p-4">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>

      {/* Lokasi Peta */}
      <div>
        <Skeleton className="mb-3 h-5 w-24" />
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="mt-2 h-3 w-40" />
      </div>

      {/* SECTION A: Informasi Pergerakan */}
      <div>
        <div className="mb-3 border-b pb-2">
          <Skeleton className="h-5 w-40" />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[...Array(4)].map((_, i) => (
            <div key={`pergerakan-${i}`} className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* SECTION B & C Wrapper */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Detail Rute */}
        <div>
          <div className="mb-3 border-b pb-2">
            <Skeleton className="h-5 w-28" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-24 rounded-sm" />
            {[...Array(4)].map((_, i) => (
              <div key={`rute-${i}`} className="space-y-1.5">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>

        {/* Detail Trip */}
        <div>
          <div className="mb-3 border-b pb-2">
            <Skeleton className="h-5 w-28" />
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={`trip-${i}`} className="space-y-1.5">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-4 w-36" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION D: Informasi Gerbong */}
      <div>
        <div className="mb-3 flex w-full items-center justify-between border-b pb-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-4" />
        </div>
        <div className="space-y-3 pt-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={`gerbong-${i}`}
              className="flex flex-col gap-3 rounded-lg border p-3"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-28 rounded-sm" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-2 flex-1 rounded-full" />
                <Skeleton className="h-3 w-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
