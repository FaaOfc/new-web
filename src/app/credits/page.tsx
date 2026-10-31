"use client";

import { Sparkles, Github, ExternalLink, Code2, Palette, Box } from "lucide-react";

const credits = [
  {
    category: "Framework & Runtime",
    icon: Code2,
    color: "#000000",
    items: [
      { name: "Next.js 16", url: "https://nextjs.org", desc: "React framework dengan App Router dan Server Components" },
      { name: "React 19", url: "https://react.dev", desc: "Library UI deklaratif untuk membangun antarmuka pengguna" },
      { name: "Bun", url: "https://bun.sh", desc: "Runtime JavaScript yang cepat untuk menjalankan dan membuild proyek" },
      { name: "TypeScript", url: "https://typescriptlang.org", desc: "Superset JavaScript dengan type safety untuk kode yang lebih robust" },
    ],
  },
  {
    category: "Styling & UI",
    icon: Palette,
    color: "#38bdf8",
    items: [
      { name: "Tailwind CSS 4", url: "https://tailwindcss.com", desc: "Utility-first CSS framework untuk styling yang cepat dan konsisten" },
      { name: "shadcn/ui", url: "https://ui.shadcn.com", desc: "Komponen UI yang bisa di-copy, dibangun di atas Radix UI" },
      { name: "Radix UI", url: "https://radix-ui.com", desc: "Primitives UI yang accessible dan unstyled untuk React" },
      { name: "Lucide React", url: "https://lucide.dev", desc: "Koleksi ikon SVG yang beautiful dan konsisten" },
      { name: "Framer Motion", url: "https://motion.dev", desc: "Library animasi untuk React dengan API yang deklaratif" },
    ],
  },
  {
    category: "Scraper Engine",
    icon: Box,
    color: "#3b82f6",
    items: [
      { name: "@coflyn/scrapr", url: "https://github.com/coflyn/scrapr", desc: "Universal media extractor & link resolver — 54 engine downloader TikTok, Instagram, YouTube, dan lainnya" },
      { name: "Axios", url: "https://axios-http.com", desc: "HTTP client berbasis Promise untuk mengambil data dari berbagai sumber" },
      { name: "Cheerio", url: "https://cheerio.js.org", desc: "Parsing HTML yang cepat dan ringan — jQuery untuk server" },
    ],
  },
  {
    category: "Infrastruktur",
    icon: Box,
    color: "#8b5cf6",
    items: [
      { name: "GitHub", url: "https://github.com", desc: "Backend gratis untuk CDN (repo) dan database short URL (gist)" },
      { name: "Vercel", url: "https://vercel.com", desc: "Hosting Next.js tanpa biaya dengan deploy otomatis" },
    ],
  },
];

export default function CreditsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center neo-border rounded-xl p-4 bg-emerald-50 dark:bg-emerald-950 mb-4">
          <Sparkles className="size-8 text-emerald-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-mono font-bold mb-2">
          Credits
        </h1>
        <p className="font-mono text-sm" style={{ color: "var(--neo-muted-text)" }}>
          Library dan teknologi open-source yang menjadi fondasi TaoSite.
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-8">
        {credits.map((category) => {
          const CatIcon = category.icon;
          return (
            <div key={category.category}>
              <h2 className="font-mono font-bold text-base mb-4 flex items-center gap-2">
                <div
                  className="neo-border rounded-md p-1.5"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <CatIcon className="size-4" style={{ color: category.color }} />
                </div>
                {category.category}
              </h2>
              <div className="space-y-3">
                {category.items.map((item) => (
                  <div key={item.name} className="neo-card p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-mono font-bold text-sm">{item.name}</h3>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs hover:text-emerald-500 transition-colors"
                            style={{ color: "var(--neo-muted-text)" }}
                          >
                            <ExternalLink className="size-3 inline" />
                          </a>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: "var(--neo-muted-text)" }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* OSS Love */}
      <div className="neo-card p-5 mt-8 text-center">
        <p className="font-mono text-sm" style={{ color: "var(--neo-muted-text)" }}>
          Taosite tidak akan ada tanpa komunitas open-source. Terima kasih kepada
          <a href="https://github.com/coflyn/scrapr" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline"> @coflyn/scrapr </a>
          dan semua maintainer library di atas!
        </p>
        <div className="flex justify-center gap-2 mt-3">
          <a
            href="https://github.com/FaaOfc"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn inline-flex items-center gap-2 px-4 py-2 font-mono text-xs bg-emerald-500 text-white hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_var(--neo-shadow-color)] transition-all"
          >
            <Github className="size-3.5" />
            Follow di GitHub
            <ExternalLink className="size-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
