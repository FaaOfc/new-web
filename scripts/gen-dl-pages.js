// Generator halaman statis kategori & sub-engine dari registry.
// Output: src/app/<slug>/page.tsx dan src/app/<slug>/[sub]/page.tsx
const fs = require("fs");
const path = require("path");

const SRC = path.join(process.cwd(), "src", "app");

const cats = [
  { slug: "ttdl", libKey: "tiktok", label: "TikTok" },
  { slug: "igdl", libKey: "instagram", label: "Instagram" },
  { slug: "fbdl", libKey: "facebook", label: "Facebook" },
  { slug: "twdl", libKey: "twitter", label: "Twitter" },
  { slug: "ytdl", libKey: "youtube", label: "YouTube" },
  { slug: "pindl", libKey: "pinterest", label: "Pinterest" },
  { slug: "threaddl", libKey: "threads", label: "Threads" },
  { slug: "reddl", libKey: "reddit", label: "Reddit" },
  { slug: "teraboxdl", libKey: "terabox", label: "Terabox" },
  { slug: "scdl", libKey: "soundcloud", label: "SoundCloud" },
  { slug: "douyindl", libKey: "douyin", label: "Douyin" },
  { slug: "pixivdl", libKey: "pixiv", label: "Pixiv" },
  { slug: "spdl", libKey: "spotify", label: "Spotify" },
  { slug: "animedl", libKey: "anime", label: "Anime" },
  { slug: "komikdl", libKey: "comic", label: "Komik" },
  { slug: "resolver", libKey: "resolver", label: "Resolver" },
];

const indexTemplate = (c) => `import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory, getEngine } from "@/lib/scraper-registry";
import DownloaderPage from "@/components/downloader/downloader-page";

const cat = getCategory("${c.slug}");
if (!cat) notFound();
const engine = getEngine(cat, cat.defaultEngine)!;

export const metadata: Metadata = {
  title: "${c.label} Downloader — TaoSite",
  description: cat.description,
};

export default function Page() {
  return <DownloaderPage category={cat} activeEngine={engine} />;
}
`;

const subTemplate = (c) => `import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory, getEngine } from "@/lib/scraper-registry";
import DownloaderPage from "@/components/downloader/downloader-page";

type Props = { params: Promise<{ sub: string }> };

export function generateStaticParams() {
  const cat = getCategory("${c.slug}")!;
  return cat.engines.map((e) => ({ sub: e.key }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sub } = await params;
  const cat = getCategory("${c.slug}")!;
  const engine = getEngine(cat, sub);
  return {
    title: \`${c.label} Downloader \${engine ? "· " + engine.label : ""} — TaoSite\`,
    description: cat.description,
  };
}

export default async function Page({ params }: Props) {
  const { sub } = await params;
  const cat = getCategory("${c.slug}");
  if (!cat) notFound();
  const engine = getEngine(cat, sub);
  if (!engine) notFound();
  return <DownloaderPage category={cat} activeEngine={engine} />;
}
`;

let made = 0;
for (const c of cats) {
  const dir = path.join(SRC, c.slug);
  const subDir = path.join(dir, "[sub]");
  fs.mkdirSync(subDir, { recursive: true });
  fs.writeFileSync(path.join(dir, "page.tsx"), indexTemplate(c));
  fs.writeFileSync(path.join(subDir, "page.tsx"), subTemplate(c));
  made += 2;
}
console.log(`Generated ${made} page files for ${cats.length} categories`);
