import { isCancel } from "axios"

export function isAbortError(error: unknown): boolean {
  if (isCancel(error)) return true
  if (error instanceof Error && error.name === "AbortError") return true
  return false
}

export function getErrorMessage(error: unknown): {
  title: string

  description: string
} {
  // Check if it's an axios error
  if (error && typeof error === "object" && "isAxiosError" in error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const axiosError = error as any

    if (!axiosError.response) {
      return {
        title: "Koneksi Gagal",
        description: "Periksa koneksi internet Anda.",
      }
    }

    const status = axiosError.response.status
    switch (status) {
      case 400:
        return {
          title: "Permintaan Tidak Valid",
          description: "Parameter yang dikirim tidak sesuai.",
        }
      case 401:
        return {
          title: "Tidak Terautentikasi",
          description: "Sesi Anda telah berakhir.",
        }
      case 403:
        return {
          title: "Akses Ditolak",
          description: "Anda tidak memiliki izin.",
        }
      case 404:
        return {
          title: "Data Tidak Ditemukan",
          description: "Sumber daya yang diminta tidak tersedia.",
        }
      case 408:
        return {
          title: "Permintaan Timeout",
          description: "Server membutuhkan waktu terlalu lama.",
        }
      case 429:
        return {
          title: "Terlalu Banyak Permintaan",
          description: "Batas request tercapai, coba beberapa saat lagi.",
        }
      case 500:
        return {
          title: "Kesalahan Server",
          description: "Terjadi kesalahan pada server.",
        }
      case 502:
        return {
          title: "Server Tidak Merespons",
          description: "Gateway error, coba beberapa saat lagi.",
        }
      case 503:
        return {
          title: "Layanan Tidak Tersedia",
          description: "Server sedang dalam pemeliharaan.",
        }
      default:
        break
    }
  }

  const message =
    error instanceof Error ? error.message : "Terjadi kesalahan sistem."
  return {
    title: "Terjadi Kesalahan",
    description: message,
  }
}
