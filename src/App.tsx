import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import { ToastProviderResponsive } from "@/components/ui/toast-provider-responsive"

import { Dashboard } from "@/pages/Dashboard"

import { useThemeStore } from "@/store/themeStore"

function App() {
  const { theme } = useThemeStore()

  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [theme])

  return (
    <ToastProviderResponsive>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ToastProviderResponsive>
  )
}

export default App
