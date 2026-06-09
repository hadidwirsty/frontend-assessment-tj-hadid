# Transjakarta Fleet Management System

Aplikasi pemantauan armada berbasis web (*Single Page Application*) yang dibangun untuk Transjakarta Frontend Engineer Technical Assessment. Menggunakan React 19, TypeScript, dan Vite, aplikasi ini memvisualisasikan data real-time kendaraan dari MBTA API.

## 🚀 Fitur Utama

- **Real-time Vehicle Monitoring**: Menampilkan grid status kendaraan (lokasi, status terbaru, *timestamp*).
- **Server-side Pagination**: Menavigasi data kendaraan secara efisien dan performa tinggi (memanfaatkan URL parameters).
- **Smart Filtering (Infinite Scroll)**: Menyaring kendaraan berdasarkan Rute dan Trip menggunakan *dropdown* pintar berbasis pencarian (*searchable*) dengan fitur *infinite scroll/lazy-load* untuk efisiensi transfer data.
- **Interactive Details & Map Integration**: Melihat detail informasi kendaraan beserta peta *real-time* lokasinya (menggunakan Leaflet).
- **URL State Management**: Seluruh parameter filter dan halaman otomatis tersinkronisasi dengan URL untuk kemampuan membagikan link (*shareable*) yang konsisten.

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Data Fetching & Caching**: TanStack React Query + Axios
- **Routing**: React Router DOM
- **Map Component**: Leaflet + react-leaflet
- **Date Formatting**: date-fns

## ⚙️ Arsitektur & Pola Desain

Aplikasi menggunakan struktur proyek **Feature-Based**:
- `src/components/vehicle/`: Komponen spesifik terkait manajemen tampilan kendaraan.
- `src/components/filters/`: Komponen generik dan spesifik untuk filter (dropdown interaktif, filter bar).
- `src/services/mbta.ts`: Lapisan *Data Access* terpusat (API Client) yang bersih menggunakan tipe-tipe TypeScript yang mendefinisikan *interface* respons (di `src/types/mbta.ts`).

### Fetching Data, Caching, & Pagination
- Digunakan pola **Custom Hooks** (`useVehicles`, `useRoutes`, `useTrips`, `useVehicleDetail`) yang membungkus *TanStack Query*. Ini menciptakan *Separation of Concerns* sehingga komponen UI murni hanya menangani presentasi data tanpa tercampur logika pengambilan API.
- **Pagination Server-Side**: Komponen `Pagination.tsx` membaca data meta limit/offset dan menangani transisi halaman. Data dikontrol melalui *Query Parameters* react-router-dom agar sinkron dengan state *back/forward* pada browser.
- **Infinite Scrolling API**: Filter Route dan Trip dirender menggunakan pola *Infinite Query* (dibungkus `useInfiniteList` custom hook) dan dikombinasikan dengan API browser `IntersectionObserver` pada sebuah elemen penanda terbawah (*sentinel node*) untuk memicu *load page* selanjutnya secara otomatis.

## 🏁 Cara Menjalankan Aplikasi Secara Lokal

1. **Instalasi Dependensi**  
   Direkomendasikan menggunakan `pnpm` sesuai *lockfile*:
   ```bash
   pnpm install
   ```

2. **Konfigurasi Environment**  
   Aplikasi membutuhkan `VITE_MBTA_BASE_URL`. Anda dapat menyalin file `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. **Jalankan Development Server**  
   ```bash
   pnpm run dev
   ```
   Buka `http://localhost:5173` di browser Anda.

## 📝 Commands / Skrip Tambahan

- `pnpm run build` : Melakukan build aplikasi statis untuk *production*.
- `pnpm run lint` : Menjalankan ESLint.
- `pnpm run format` : Memformat kode dengan konsisten menggunakan Prettier.
- `pnpm run typecheck` : Mengecek kebenaran *typing* TypeScript secara murni tanpa *emit* build.
