import { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
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
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
