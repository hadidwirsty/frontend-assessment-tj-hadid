export interface GetVehiclesParams {
  "filter[route]"?: string
  "filter[trip]"?: string
  "page[limit]"?: number
  "page[offset]"?: number
  include?: string
}
