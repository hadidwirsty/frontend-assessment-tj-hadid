import axios from "axios"

export const baseURL =
  import.meta.env.VITE_MBTA_BASE_URL || "https://api-v3.mbta.com"

export const mbtaClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})
