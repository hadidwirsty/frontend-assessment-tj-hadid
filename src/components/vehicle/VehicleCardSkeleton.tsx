import { Skeleton } from "@/components/ui/skeleton"

export function VehicleCardSkeleton() {
  return (
    <div className="border/20 rounded-xl border border-l-6 bg-card text-card-foreground shadow-sm">
      <div className="space-y-6 p-6">
        <div className="flex items-start justify-between">
          <div>
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-48" />
        </div>
        <div>
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    </div>
  )
}
