import axios from "axios"

import { toastManager } from "@/components/ui/toast"

import { getErrorMessage, isAbortError } from "@/lib/handleError"

export const baseURL =
  import.meta.env.VITE_MBTA_BASE_URL || "https://api-v3.mbta.com"

export const mbtaClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

mbtaClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAbortError(error)) return Promise.reject(error)

    const { title, description } = getErrorMessage(error)

    toastManager.add({
      type: "error",
      title,
      description,
    })

    return Promise.reject(error)
  }
)
