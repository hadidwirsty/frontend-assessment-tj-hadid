import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useThemeStore } from "@/store/themeStore"

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Ganti tema"
      title="Ganti tema"
    >
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all" />
      )}
    </Button>
  )
}
