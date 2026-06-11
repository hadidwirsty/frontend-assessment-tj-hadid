import { useState, useEffect } from "react"

import type { ToastPosition } from "@/components/ui/toast"

export function useToastPosition(): ToastPosition {
  const [position, setPosition] = useState<ToastPosition>(() => {
    // Check initial matchMedia securely
    if (typeof window !== "undefined") {
      return window.matchMedia("(min-width: 768px)").matches
        ? "bottom-right"
        : "top-center"
    }
    return "top-center"
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)")

    const handler = (e: MediaQueryListEvent) => {
      setPosition(e.matches ? "bottom-right" : "top-center")
    }

    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  return position
}
