import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import { ToastProvider } from "@/components/ui/toast"

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
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ToastProvider>
  )
}

export default App
