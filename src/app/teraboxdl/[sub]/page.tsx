import type { Metadata } from "next";
import DownloaderClient from "@/components/downloader/downloader-client";
import { findCategory } from "@/lib/scraper-registry";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const cat = findCategory("teraboxdl")!;
  return cat.engines.map((e) => ({ sub: e.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ sub: string }> }
): Promise<Metadata> {
  const { sub } = await params;
  const cat = findCategory("teraboxdl")!;
  const engine = cat.engines.find((e) => e.slug === sub);
  return {
    title: engine
      ? `${cat.label} - ${engine.slug} — TaoSite`
      : `${cat.label} Downloader — TaoSite`,
    description: engine?.desc ?? cat.desc,
  };
}

const PLACEHOLDERS: Record<string, string> = {
  ttdl: "https://www.tiktok.com/@user/video/...",
  igdl: "https://www.instagram.com/reel/...",
  fbdl: "https://www.facebook.com/watch?v=...",
  twdl: "https://x.com/user/status/...",
  ytdl: "https://www.youtube.com/watch?v=...",
  pindl: "https://pin.it/... atau https://pinterest.com/pin/...",
  threaddl: "https://www.threads.net/@user/post/...",
  reddl: "https://www.reddit.com/r/.../comments/...",
  teraboxdl: "https://terabox.com/s/...",
  scdl: "https://soundcloud.com/artist/track",
  douyindl: "https://www.douyin.com/video/...",
  pixivdl: "https://www.pixiv.net/artworks/...",
  spdl: "https://open.spotify.com/track/...",
  animedl: "https://otakudesu.anime/episode/...",
  komikdl: "https://komikcast.com/chapter/...",
  resolver: "https://sfile.mobi/... atau shortlink apa pun",
};

export default async function Page(
  { params }: { params: Promise<{ sub: string }> }
) {
  const { sub } = await params;
  const cat = findCategory("teraboxdl")!;
  const engine = cat.engines.find((e) => e.slug === sub);
  if (!engine) notFound();

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-start justify-center py-8 sm:py-16 px-4">
      <DownloaderClient
        categorySlug={cat.slug}
        categoryLabel={cat.label}
        color={cat.color}
        engineSlug={engine.slug}
        engineLabel={engine.slug}
        placeholder={PLACEHOLDERS["teraboxdl"]}
        hasFormatChoice={cat.slug === "ytdl" && engine.slug === "ytmp3"}
        siblingEngines={cat.engines.map((e) => ({ slug: e.slug, desc: e.desc }))}
      />
    </div>
  );
}
