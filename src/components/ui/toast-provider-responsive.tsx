import { ToastProvider } from "@/components/ui/toast"

import { useToastPosition } from "@/hooks/useToastPosition"

export function ToastProviderResponsive({
  children,
}: {
  children: React.ReactNode
}) {
  const position = useToastPosition()
  return <ToastProvider position={position}>{children}</ToastProvider>
}
