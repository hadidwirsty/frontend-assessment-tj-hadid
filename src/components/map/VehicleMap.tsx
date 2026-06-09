import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { MapPinOff } from "lucide-react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

interface VehicleMapProps {
  lat?: number | null
  lng?: number | null
  label?: string | null
}

export function VehicleMap({ lat, lng, label }: VehicleMapProps) {
  if (lat == null || lng == null) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center rounded-md bg-muted text-muted-foreground">
        <MapPinOff className="mb-2 h-8 w-8" />
        <p>Lokasi tidak tersedia</p>
      </div>
    )
  }

  return (
    <div className="h-64 w-full overflow-hidden rounded-md border">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>{label || "Kendaraan"}</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
