# TaoSite — CDN · ShortURL · Multi-Platform Downloader

Versi web TaoSite dengan **54 engine downloader** dari [`@coflyn/scrapr`](https://github.com/coflyn/scrapr) terintegrasi penuh, tema **neobrutalism** asli, dan dukungan **mode terang & gelap**.

Tanpa database, tanpa login, tanpa layanan berbayar — **siap deploy ke Vercel (plan gratis)**.

---

## ✨ Fitur

| Fitur | Keterangan |
|---|---|
| 🔗 CDN Hosting | Upload file apa pun (semua MIME), disimpan di GitHub repo, disajikan lewat domainmu |
| ✂️ ShortURL | Pendek URL + kode kustom, tersimpan di GitHub Gist, halaman redirect countdown |
| ⬇️ 16 kategori downloader | 54 engine pilihan dari scrapr — TikTok, Instagram, YouTube, dll. |
| 📱 Unduh Versi Aplikasi | Halaman `/downloads`, link app diatur di satu file config |
| 📺 Nonton Anime | Halaman "Segera Hadir" |
| 💎 Top UP Murah | Halaman "Segera Hadir" |
| 🌗 Light / Dark | Toggle tema di sidebar, mengikuti preferensi sistem |

## 🌐 Struktur URL Downloader

Setiap kategori punya slug pendek, tiap engine jadi sub-path:

```
https://domainmu.com/igdl/snapsave
                        └──┬───┘ └──┬───┘
                      kategori   engine
```

| Kategori | Slug | Engine |
|---|---|---|
| TikTok | `/ttdl` | tikdownloader · snaptik · ssstik · savetik · tiktokio |
| Instagram | `/igdl` | snapsave · snapinsta · indown · direct |
| Facebook | `/fbdl` | snapsave · fdown |
| Twitter / X | `/twdl` | savetwt · direct · tvd · tweeload |
| YouTube | `/ytdl` | ytmp3gg · ytmp3 (mp4/mp3) · playlist |
| Pinterest | `/pindl` | pindown · direct |
| Threads | `/threaddl` | threadster |
| Reddit | `/reddl` | rapidsave |
| Terabox | `/teraboxdl` | sechno |
| SoundCloud | `/scdl` | klickaud |
| Douyin | `/douyindl` | direct |
| Pixiv | `/pixivdl` | ajax |
| Spotify | `/spdl` | spotidown · spotmate · soundloaders · spotisaver |
| Anime | `/animedl` | otakudesu · nimegami · gogoanime · animetosho |
| Komik | `/komikdl` | komikcast · kiryuu · komiku · mangadex · komikindo · bacakomik · manhwaindo · asurascans · mangabats |
| Resolver Link | `/resolver` | sfile · mediafire · safelinku · pixeldrain · catbox · krakenfiles · doodstream · gdrive · sub2unlock · rekonise · unshorten |

API-nya konsisten: `GET /api/dl/<kategori>/<engine>?url=<url>` (contoh: `/api/dl/igdl/snapsave?url=...`).
Daftar lengkap API: `GET /api/dl`.

> Kategori scrapr yang **dikecualikan** sesuai permintaan: `bandcamp`, `applemusic`, `bilibili`, `rednote`.

## 🚀 Deploy ke Vercel (gratis)

1. **Push ke GitHub** — upload folder ini ke repo baru (tanpa `node_modules`).
2. **Import di Vercel** — [vercel.com/new](https://vercel.com/new) → pilih repo → Deploy. Framework otomatis terdeteksi sebagai Next.js, tidak perlu set build command apa pun.
3. **Selesai.** Tidak ada database yang perlu disiapkan.

> ⚠️ **Catatan migrasi dari opensorc:** pastikan repo kamu TIDAK lagi berisi folder `src/app/api/auth`, `src/app/api/chat`, `src/app/api/imagen`, dan folder AI/auth lainnya, serta `prisma/`. Folder tersebut sudah dihapus di versi ini — membiarkannya menyebabkan error build `module not found: bcryptjs`.

### Environment Variables (opsional)

CDN & ShortURL memakai GitHub sebagai backend. Isi di *Settings → Environment Variables* Vercel:

| Variable | Fungsi | Wajib? |
|---|---|---|
| `GITHUB_TOKEN` | Personal access token (repo + gist scope) | Untuk CDN & ShortURL |
| `GITHUB_USER` | Username GitHub kamu | Untuk CDN |
| `CDN_REPO` | Nama repo penyimpan file CDN | Untuk CDN |
| `GIST_ID` | ID Gist penyimpan mapping URL pendek | Untuk ShortURL |
| `APP_DOMAIN` | Domain produksi, contoh `https://taosite.my.id` | Untuk output link ShortURL |

Tanpa variable tersebut, fitur downloader tetap berfungsi normal (CDN/ShortURL masuk mode demo).

### Custom domain

*Settings → Domains* → tambahkan `taosite.my.id` (atau domainmu), lalu arahkan DNS sesuai petunjuk Vercel.

## ⚙️ Kustomisasi Cepat

| Mau mengubah... | Edit file ini |
|---|---|
| Link unduh versi aplikasi | `src/lib/appConfig.ts` |
| Nama situs, sosmed, banner | `src/lib/config.ts` |
| Daftar kategori & engine downloader | `src/lib/scraper-registry.ts` |
| Link CDN/ShortURL (GitHub) | env vars Vercel |

## 🗂️ Struktur Proyek

```
taosite/
├── vendor/scrapr/            # Library @coflyn/scrapr (vendored, CommonJS)
├── src/
│   ├── app/
│   │   ├── <16 kategori>/    # /igdl, /ttdl, ... + /[sub] engine page
│   │   ├── api/dl/[category]/[engine]  # API scraper universal
│   │   ├── cdn/ · short/     # CDN & ShortURL
│   │   ├── downloads/        # Unduh versi aplikasi
│   │   ├── nonton-anime/ · topup/      # Segera hadir
│   │   └── about/ thanks/ tos/ credits/
│   ├── components/
│   │   ├── downloader/       # DownloaderClient, CategoryView
│   │   ├── sidebar/ footer/ intro      # Kerangka UI
│   │   └── ui/               # shadcn/ui
│   └── lib/
│       ├── scraper-registry.ts  # 16 kategori · 54 engine
│       ├── scrapr-engine.ts     # Loader engine (server)
│       ├── normalize.ts         # Normalisasi hasil scrape
│       ├── appConfig.ts         # Link unduh aplikasi
│       └── config.ts            # Site config
└── package.json
```

## 🙏 Credits

- [opensorc](https://github.com/FaaOfc/opensorc) — basis proyek (CDN, ShortURL, tema neobrutalism)
- [@coflyn/scrapr](https://github.com/coflyn/scrapr) — 54 engine downloader
