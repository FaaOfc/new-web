"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Download, Info } from "lucide-react";
import { type CategoryDef, type EngineDef } from "@/lib/scraper-registry";
import { getCategoryIcon } from "./icon-map";
import ResultView from "./result-view";
import type { NormalizedData } from "@/lib/normalize";

export default function DownloaderPage({
  category,
  activeEngine,
}: {
  category: CategoryDef;
  activeEngine: EngineDef;
}) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    data: NormalizedData;
    engine: string;
  } | null>(null);
  const [paramValues, setParamValues] = useState<Record<string, string>>({});

  // inisialisasi parameter engine (mis. format mp4/mp3)
  useEffect(() => {
    const init: Record<string, string> = {};
    for (const p of activeEngine.params || []) init[p.name] = p.default;
    setParamValues(init);
  }, [activeEngine]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!url.trim()) return;

      setLoading(true);
      setError(null);
      setResult(null);

      try {
        const qs = new URLSearchParams({ url: url.trim() });
        for (const [k, v] of Object.entries(paramValues)) qs.set(k, v);

        const res = await fetch(
          `/api/dl/${category.slug}/${activeEngine.key}?${qs.toString()}`
        );
        const json = await res.json();

        if (json.status && json.data) {
          setResult({ data: json.data, engine: json.engine || activeEngine.label });
        } else {
          throw new Error(json.message || "Gagal mengambil data.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
      } finally {
        setLoading(false);
      }
    },
    [url, category, activeEngine, paramValues]
  );

  const Icon = getCategoryIcon(category.icon);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-start justify-center py-8 sm:py-14 px-4">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div
            className="inline-flex items-center justify-center neo-border rounded-xl p-3 mb-4"
            style={{ backgroundColor: `${category.color}18` }}
          >
            <Icon className="size-8" style={{ color: category.color }} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-mono font-bold mb-1">
            {category.label} Downloader
          </h1>
          <p className="text-sm font-mono" style={{ color: "var(--neo-muted-text)" }}>
            {category.description}
          </p>
        </div>

        {/* Engine tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
          {category.engines.map((eng) => {
            const active = eng.key === activeEngine.key;
            return (
              <Link
                key={eng.key}
                href={`/${category.slug}/${eng.key}`}
                className={`neo-btn px-3 py-1.5 font-mono text-xs font-medium transition-all ${
                  active
                    ? "bg-[var(--neo-border-color)] text-[var(--neo-card-bg)] shadow-none"
                    : "bg-[var(--neo-card-bg)] hover:opacity-80"
                }`}
              >
                {eng.label}
              </Link>
            );
          })}
        </div>

        {/* Input Card */}
        <div className="neo-card p-3 sm:p-4 mb-5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Icon className="size-4" />
              </div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={category.placeholder}
                required
                className="neo-border rounded-lg w-full pl-10 pr-3 py-2.5 font-mono text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>

            {/* Parameter engine (mis. format) */}
            {(activeEngine.params || []).length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {activeEngine.params!.map((p) => (
                  <div key={p.name} className="flex items-center gap-1.5">
                    <span className="font-mono text-xs" style={{ color: "var(--neo-muted-text)" }}>
                      {p.name}:
                    </span>
                    {p.values.map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() =>
                          setParamValues((s) => ({ ...s, [p.name]: v }))
                        }
                        className={`px-2.5 py-1 rounded-md font-mono text-xs neo-border transition-all ${
                          (paramValues[p.name] || p.default) === v
                            ? "bg-[var(--neo-border-color)] text-[var(--neo-card-bg)] shadow-none"
                            : "bg-[var(--neo-card-bg)] hover:opacity-80"
                        }`}
                      >
                        {v.toUpperCase()}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="neo-btn bg-[#18181b] text-white px-5 py-2.5 font-mono font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-800 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Download className="size-4" />
                  Process
                </>
              )}
            </button>
          </form>
        </div>

        {/* Engine note */}
        {activeEngine.note && (
          <div
            className="mb-5 p-3 rounded-lg border-2 border-dashed flex items-start gap-2 font-mono text-xs"
            style={{ color: "var(--neo-muted-text)" }}
          >
            <Info className="size-4 shrink-0 mt-0.5" />
            Engine {activeEngine.label}: {activeEngine.note}. Jika gagal, pilih
            engine lain di atas.
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center gap-3 my-8">
            <div className="w-9 h-9 border-4 border-gray-200 dark:border-zinc-700 border-t-[#18181b] dark:border-t-zinc-100 rounded-full animate-spin" />
            <p className="text-sm font-mono animate-pulse" style={{ color: "var(--neo-muted-text)" }}>
              Mengambil data dari {activeEngine.label}...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-950 border-2 border-red-300 dark:border-red-800 rounded-xl text-center font-mono text-sm text-red-700 dark:text-red-300 mb-5">
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <ResultView
            data={result.data}
            platform={category.slug}
            engineLabel={result.engine}
          />
        )}

        {/* Back to category list */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push(`/${category.slug}`)}
            className="font-mono text-xs hover:text-orange-500 transition-colors"
            style={{ color: "var(--neo-muted-text)" }}
          >
            ← Semua engine {category.label}
          </button>
        </div>
      </div>
    </div>
  );
}
