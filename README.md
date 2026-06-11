# Fleet Management System — Transjakarta

🔗 **Live Demo:** [https://frontend-assessment-tj-hadid.vercel.app/](https://frontend-assessment-tj-hadid.vercel.app/)
Aplikasi pemantauan armada berbasis web (*Single Page Application*) untuk memvisualisasikan data real-time kendaraan secara efisien.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Cara Menjalankan Aplikasi

**Prerequisites:**
- Node.js (direkomendasikan versi 20 atau lebih baru)
- Package Manager: `pnpm` (direkomendasikan karena terdapat `pnpm-lock.yaml`) atau `npm`

**Langkah-langkah:**
1. **Clone repository:**
   ```bash
   git clone <url-repository-ini>
   cd frontend-assessment-tj-hadid
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Setup environment variable:**
   Salin file `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```
   Pastikan konfigurasi `VITE_MBTA_BASE_URL=https://api-v3.mbta.com` berada di dalam file `.env`.

4. **Jalankan development server:**
   ```bash
   pnpm run dev
   ```

5. **Buka di browser:**
   Akses antarmuka aplikasi melalui `http://localhost:5173`.

**Perintah Tambahan:**
- Build production: `pnpm run build`
- Preview hasil build: `pnpm run preview`

## Deployment

### Vercel (Rekomendasi)

**Cara 1 — Via Vercel Dashboard (paling mudah):**
1. Push branch `development` ke GitHub
2. Buka https://vercel.com dan login dengan akun GitHub
3. Klik "Add New Project" → Import repository ini
4. Vercel otomatis mendeteksi Vite — pastikan konfigurasi berikut:
   - Framework Preset: Vite
   - Build Command: `pnpm run build`
   - Output Directory: `dist`
   - Install Command: `pnpm install`
5. Tambahkan Environment Variable:
   - Key: `VITE_MBTA_BASE_URL`
   - Value: `https://api-v3.mbta.com`
6. Klik Deploy

**Cara 2 — Via Vercel CLI:**
```bash
# Install Vercel CLI
pnpm add -g vercel

# Login
vercel login

# Deploy dari branch development
vercel

# Deploy ke production
vercel --prod
```

> **Catatan:** Setiap push ke branch `main` akan otomatis trigger
> re-deployment jika repository sudah terhubung ke Vercel.

## Fitur Aplikasi

Sesuai dengan requirement penilaian, fitur yang sudah diimplementasikan meliputi:
- **Vehicle Card Grid + Pagination**: Menampilkan data kendaraan secara dinamis.
- **Filter Route & Trip (Multi-select + Infinite Scroll)**: Penyaringan cerdas dengan *dropdown* berbasis *lazy load*.
- **Detail Popup Kendaraan**: Rincian status, rute, dan posisi kendaraan dalam bentuk modal terpusat. Detail telah diperkaya dengan:
  - **Informasi Pergerakan:** Arah, kecepatan, urutan halte, dan status operasi.
  - **Detail Rute:** *Badge* warna rute, nama, tipe layanan, kelas tarif, dan arah tujuan.
  - **Detail Trip:** *Headsign*, aksesibilitas kursi roda, dan info izin masuk sepeda.
  - **Informasi Gerbong:** Indikator visual progres okupansi (*occupancy*) dalam komponen *collapsible*.
- **Peta Posisi Kendaraan (Leaflet) — Bonus**: Peta integrasi *real-time* berbasis koordinat.
- **TypeScript End-to-End — Bonus**: Type-safety murni, selaras dengan skema respon JSON API MBTA.
- **Light/Dark Theme Toggle**: Modifikasi tema visual (default *light*, dipersistensi via `localStorage`).
- **Global Error Handling**: Penangkapan HTTP *error* secara sentral dengan notifikasi *toast* otomatis.

## Arsitektur yang Digunakan

### 4a. Struktur Direktori
Aplikasi mengadopsi struktur proyek *Feature-Based* untuk skalabilitas tinggi:
- `src/modules/`: Modul fitur (seperti `vehicle`, `route`, `trip`) di mana masing-masing dipecah rapi ke dalam *entity*, *DTO*, *response type*, dan antarmuka *service API*.
- `src/shared/`: Berisi pilar infrastruktur gabungan (instansiasi *Axios client* dan tipe dasar JSON:API).
- `src/components/`: Tempat berkumpulnya *Reusable React UI*, dipilah menjadi generik (shadcn) dan *feature-level* (vehicle, filters, map).
- `src/hooks/`: Koleksi *Custom Hooks* untuk enkapsulasi abstraksi *TanStack Query*.
- `src/pages/`: Komponen agregasi di tingkat halaman (seperti `Dashboard.tsx`).
- `src/store/`: Disiapkan untuk arsitektur pengelola state global terpusat (*Zustand*).

### 4b. Metode Pengambilan Data (GET Data)
- **Library yang digunakan:** Axios (HTTP Client) digabungkan dengan TanStack Query (React Query).
- **Kenapa TanStack Query:** Menawarkan manajemen asinkron mutakhir (*background refetching*, penanganan otomatis *loading state* & *error state*, serta mekanisme *caching* bawaan).
- **Pola yang digunakan:** Logika pengambilan data dipisahkan dari layer antarmuka dan dibungkus menjadi *custom hooks* murni (`useVehicles`, `useRoutes`, `useTrips`).
- **Bagaimana filter dikirim ke API:** Status pada *URL Search Params* dibaca dan diekstraksi ke dalam *query params* bawaan spesifikasi MBTA API (misal: `?filter[route]=...`).
- **AbortController:** Digunakan secara reaktif untuk membatalkan paket antrean *request* lawas saat pengguna melakukan pemfilteran dengan cepat, mencegah fenomena *race condition*.

### 4c. Library UI yang Digunakan
- **Tailwind CSS v4:** Menjadi tulang punggung *utility-first styling* murni untuk membangun desain *layout*.
- **shadcn/ui:** Koleksi komponen visual siap pakai (*Card, Badge, Dialog, Select*) berstatus *copy-paste* untuk fleksibilitas arsitektur.
- **Lucide React:** Dipakai sebagai penyedia *Icon library* untuk visual grafis elemen pendukung.
- **Leaflet + React Leaflet:** Menyuntikkan tampilan peta spasial yang mudah dinavigasi (fitur bonus).

### 4d. Implementasi Pagination
- **Mekanisme Server-Side:** Proses paginasi sepenuhnya dieksekusi di *server* MBTA (*server-side*), membatasi beban *memory client*.
- **Parameter MBTA API:** Aplikasi memasok parameter `page[limit]` dan `page[offset]`.
- **Penyimpanan State:** Disimpan sinkron terhadap objek URL Search Params (contoh `?page=1&limit=20`).
- **Keuntungan URL State:** URL terjamin berstatus *shareable link* dan aksi *back/forward button* di level peramban tetap berfungsi normal.
- **Komponen Pagination:** Sanggup mempresentasikan indikator rentang (contoh: "Menampilkan 1-20 dari 100 Data"), *dropdown* pilihan jumlah per-halaman, serta pengatur navigasi iterasi.

### 4e. Implementasi Infinite Scroll (Filter Dropdown)
- **Metodologi Web API:** Menggunakan antarmuka native spesifikasi *IntersectionObserver* Web API.
- **Elemen Sentinel:** Diposisikan sebagai pengawas elemen semu (*sentinel element*) yang menempel di baris paling ujung daftar antarmuka.
- **Pemicu Otomatis:** Detik saat ruang *sentinel* masuk tertangkap oleh *viewport*, sistem memanggil otomatis laman data berikutnya.
- **Reusability:** Seluruh fungsional dirumuskan ke dalam arsitektur utilitas independen `useInfiniteList`.

### 4f. State Management
- **URL Search Params:** Mengakomodasi filter selektif aktif dan memori paginasi agar halaman seutuhnya bersifat *bookmarkable*.
- **Zustand:** Digunakan untuk mengakomodir pengelolaan status global berskala interaksi antarmuka (*UI state*), termasuk penyimpanan state *theme* persisten yang ditarik dari `localStorage`.
- **Tidak Menggunakan Redux:** Kompleksitas (*boilerplate*) milik arsitektur Redux dinilai sebagai tindakan manipulasi berlebih dan sangat tidak efisien untuk ukuran skalabilitas proyek ini.

### 4g. Clean Code Standards
- **Import Ordering:** Memisahkan skema *import* ke dalam 6 blok hierarki terpisah (React, *Third-party*, UI Base, Components, Hooks/Utils, Types).
- **Component Internal Structure:** Menerapkan regulasi urutan komponen konstan (8 area urutan termasuk Hooks, Derived State, Handlers, hingga Main Return).
- **Explicit Return Types:** Seluruh modul *service*, utilitas, serta *custom hooks* mendefinisikan *return type* murni secara ketat di ranah TypeScript.

### 4h. Global Error Handling
- **Axios Interceptor:** Menangkap semua HTTP *error* di tingkat lapisan bawah secara merata.
- **Error Mapping:** Memetakan *status code* MBTA (e.g., 404, 500, *network errors*) dan menerjemahkannya menjadi dialog kesalahan informatif berbahasa Indonesia.
- **Toast Notification:** Menampilkan umpan balik seketika ke sudut pandang pengguna via komponen terpusat `<ToastProvider>`.

### 4i. Theme System
- **Tailwind CSS darkMode:** Mengandalkan pemicu deklaratif melalui kelas utilitas HTML (`'class'`).
- **Zustand + Persistence:** Status preferensi tampilan digabungkan menggunakan fungsi *middleware persist* `localStorage`.
- **Default State:** Tema aplikasi konsisten diawali dari konfigurasi *light* (*light-mode forced default*) memintas status spesifik pengaturan *system preferences*.

## Tech Stack

| Category | Library / Tool | Version |
|----------|---------------|---------|
| UI Framework | react / react-dom | ^19.2.6 |
| Build Tool | vite | ^8 |
| Language | typescript | ~6 |
| Styling | tailwindcss | ^4 |
| UI Components | shadcn/ui (radix-ui, lucide-react) | various |
| Formatter/Linter | prettier / eslint | ^3.8.3 / ^10 |
| Data Fetching | @tanstack/react-query, axios | ^5.101.0, ^1.17.0 |
| State Management | zustand | ^5.0.14 |
| Routing | react-router-dom | ^7.17.0 |
| Map | leaflet, react-leaflet | ^1.9.4, ^5.0.0 |

## Struktur Environment Variable

| Key | Contoh Value | Keterangan |
|-----|-------------|------------|
| `VITE_MBTA_BASE_URL` | `https://api-v3.mbta.com` | Base URL resmi untuk komunikasi data endpoint API MBTA |
