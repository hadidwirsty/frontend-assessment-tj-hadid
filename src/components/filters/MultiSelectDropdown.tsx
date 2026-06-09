import { useState, useRef, useEffect } from "react"
import { Check, ChevronDown, X } from "lucide-react"

interface Item {
  id: string
  label: string
}

interface MultiSelectDropdownProps {
  label: string
  items: Item[]
  selectedIds: string[]
  onToggle: (id: string) => void
  onClear: () => void
  loading: boolean
  hasMore: boolean
  sentinelRef: (node: HTMLElement | null) => void
}

export function MultiSelectDropdown({
  label,
  items,
  selectedIds,
  onToggle,
  onClear,
  loading,
  hasMore,
  sentinelRef,
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  )

  const selectedItems = items.filter((item) => selectedIds.includes(item.id))

  return (
    <div className="relative w-full md:w-72" ref={dropdownRef}>
      {/* Trigger Button */}
      <div
        className="flex min-h-10 cursor-pointer flex-wrap items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedIds.length === 0 ? (
          <span className="text-muted-foreground">{label}</span>
        ) : (
          selectedItems.map((item) => (
            <span
              key={item.id}
              className="flex items-center gap-1 rounded bg-secondary px-2 py-1 text-xs text-secondary-foreground"
              onClick={(e) => {
                e.stopPropagation()
                onToggle(item.id)
              }}
            >
              {item.label}
              <X className="h-3 w-3 hover:text-destructive" />
            </span>
          ))
        )}
        <div className="ml-auto flex items-center gap-2">
          {selectedIds.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClear()
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <ChevronDown className="h-4 w-4 text-muted-foreground opacity-50" />
        </div>
      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute top-full z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md outline-hidden">
          <div className="sticky top-0 z-10 bg-popover p-2">
            <input
              type="text"
              placeholder="Cari..."
              className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-hidden focus:ring-2 focus:ring-ring"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="flex flex-col p-1">
            {filteredItems.map((item) => {
              const isSelected = selectedIds.includes(item.id)
              return (
                <div
                  key={item.id}
                  onClick={() => onToggle(item.id)}
                  className={`flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground ${
                    isSelected ? "bg-accent/50 text-accent-foreground" : ""
                  }`}
                >
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-primary opacity-50"
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3" />}
                  </div>
                  <span>{item.label}</span>
                </div>
              )
            })}

            {loading && (
              <div className="px-2 py-4 text-center text-xs text-muted-foreground">
                Memuat data...
              </div>
            )}

            {!loading && hasMore && filteredItems.length > 0 && (
              <div ref={sentinelRef} className="h-4 w-full" />
            )}

            {!loading && filteredItems.length === 0 && (
              <div className="px-2 py-4 text-center text-xs text-muted-foreground">
                Data tidak ditemukan
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
