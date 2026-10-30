import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory, getEngine } from "@/lib/scraper-registry";
import DownloaderPage from "@/components/downloader/downloader-page";

type Props = { params: Promise<{ sub: string }> };

export function generateStaticParams() {
  const cat = getCategory("igdl")!;
  return cat.engines.map((e) => ({ sub: e.key }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sub } = await params;
  const cat = getCategory("igdl")!;
  const engine = getEngine(cat, sub);
  return {
    title: `Instagram Downloader ${engine ? "· " + engine.label : ""} — TaoSite`,
    description: cat.description,
  };
}

export default async function Page({ params }: Props) {
  const { sub } = await params;
  const cat = getCategory("igdl");
  if (!cat) notFound();
  const engine = getEngine(cat, sub);
  if (!engine) notFound();
  return <DownloaderPage category={cat} activeEngine={engine} />;
}
