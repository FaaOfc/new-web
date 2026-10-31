import type { Metadata } from "next";
import CategoryView from "@/components/downloader/category-view";
import { findCategory } from "@/lib/scraper-registry";

export async function generateMetadata(): Promise<Metadata> {
  const cat = findCategory("animedl")!;
  return {
    title: `${cat.label} Downloader — TaoSite`,
    description: cat.desc,
  };
}

export default function Page() {
  const cat = findCategory("animedl")!;
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-start justify-center">
      <CategoryView
        categorySlug={cat.slug}
        categoryLabel={cat.label}
        categoryDesc={cat.desc}
        color={cat.color}
        iconName={cat.icon}
        engines={cat.engines.map((e) => ({ slug: e.slug, desc: e.desc }))}
      />
    </div>
  );
}
