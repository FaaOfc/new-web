// ============================================================
// ENGINE MAP — di-generate oleh scripts/gen_engine_map.py
// --------------------------------------------------------------
// Import statis seluruh engine @coflyn/scrapr (CommonJS) agar
// ter-bundle oleh Turbopack. JANGAN edit manual — jalankan ulang
// generator jika menambah/mengubah engine.
// ============================================================

export interface EngineModule {
  scrape?: (url: string, options?: Record<string, unknown>) => Promise<unknown> | unknown;
}

import * as eng_00 from "../../vendor/scrapr/lib/tiktok/savetik";
import * as eng_01 from "../../vendor/scrapr/lib/tiktok/snaptik";
import * as eng_02 from "../../vendor/scrapr/lib/tiktok/ssstik";
import * as eng_03 from "../../vendor/scrapr/lib/tiktok/tikdownloader";
import * as eng_04 from "../../vendor/scrapr/lib/tiktok/tiktokio";
import * as eng_05 from "../../vendor/scrapr/lib/instagram/direct";
import * as eng_06 from "../../vendor/scrapr/lib/instagram/indown";
import * as eng_07 from "../../vendor/scrapr/lib/instagram/snapinsta";
import * as eng_08 from "../../vendor/scrapr/lib/instagram/snapsave";
import * as eng_09 from "../../vendor/scrapr/lib/facebook/fdown";
import * as eng_10 from "../../vendor/scrapr/lib/facebook/snapsave";
import * as eng_11 from "../../vendor/scrapr/lib/twitter/direct";
import * as eng_12 from "../../vendor/scrapr/lib/twitter/savetwt";
import * as eng_13 from "../../vendor/scrapr/lib/twitter/tvd";
import * as eng_14 from "../../vendor/scrapr/lib/twitter/tweeload";
import * as eng_15 from "../../vendor/scrapr/lib/youtube/playlist";
import * as eng_16 from "../../vendor/scrapr/lib/youtube/ytmp3";
import * as eng_17 from "../../vendor/scrapr/lib/youtube/ytmp3gg";
import * as eng_18 from "../../vendor/scrapr/lib/pinterest/direct";
import * as eng_19 from "../../vendor/scrapr/lib/pinterest/pindown";
import * as eng_20 from "../../vendor/scrapr/lib/threads/threadster";
import * as eng_21 from "../../vendor/scrapr/lib/reddit/rapidsave";
import * as eng_22 from "../../vendor/scrapr/lib/terabox/sechno";
import * as eng_23 from "../../vendor/scrapr/lib/soundcloud/klickaud";
import * as eng_24 from "../../vendor/scrapr/lib/douyin/direct";
import * as eng_25 from "../../vendor/scrapr/lib/pixiv/ajax";
import * as eng_26 from "../../vendor/scrapr/lib/spotify/soundloaders";
import * as eng_27 from "../../vendor/scrapr/lib/spotify/spotidown";
import * as eng_28 from "../../vendor/scrapr/lib/spotify/spotisaver";
import * as eng_29 from "../../vendor/scrapr/lib/spotify/spotmate";
import * as eng_30 from "../../vendor/scrapr/lib/anime/animetosho";
import * as eng_31 from "../../vendor/scrapr/lib/anime/gogoanime";
import * as eng_32 from "../../vendor/scrapr/lib/anime/nimegami";
import * as eng_33 from "../../vendor/scrapr/lib/anime/otakudesu";
import * as eng_34 from "../../vendor/scrapr/lib/comic/asurascans";
import * as eng_35 from "../../vendor/scrapr/lib/comic/bacakomik";
import * as eng_36 from "../../vendor/scrapr/lib/comic/kiryuu";
import * as eng_37 from "../../vendor/scrapr/lib/comic/komikcast";
import * as eng_38 from "../../vendor/scrapr/lib/comic/komikindo";
import * as eng_39 from "../../vendor/scrapr/lib/comic/komiku";
import * as eng_40 from "../../vendor/scrapr/lib/comic/mangabats";
import * as eng_41 from "../../vendor/scrapr/lib/comic/mangadex";
import * as eng_42 from "../../vendor/scrapr/lib/comic/manhwaindo";
import * as eng_43 from "../../vendor/scrapr/lib/resolver/catbox";
import * as eng_44 from "../../vendor/scrapr/lib/resolver/doodstream";
import * as eng_45 from "../../vendor/scrapr/lib/resolver/gdrive";
import * as eng_46 from "../../vendor/scrapr/lib/resolver/krakenfiles";
import * as eng_47 from "../../vendor/scrapr/lib/resolver/mediafire";
import * as eng_48 from "../../vendor/scrapr/lib/resolver/pixeldrain";
import * as eng_49 from "../../vendor/scrapr/lib/resolver/rekonise";
import * as eng_50 from "../../vendor/scrapr/lib/resolver/safelinku";
import * as eng_51 from "../../vendor/scrapr/lib/resolver/sfile";
import * as eng_52 from "../../vendor/scrapr/lib/resolver/sub2unlock";
import * as eng_53 from "../../vendor/scrapr/lib/resolver/unshorten";

const ENGINE_MAP: Record<string, EngineModule> = {
  "tiktok/savetik": eng_00,
  "tiktok/snaptik": eng_01,
  "tiktok/ssstik": eng_02,
  "tiktok/tikdownloader": eng_03,
  "tiktok/tiktokio": eng_04,
  "instagram/direct": eng_05,
  "instagram/indown": eng_06,
  "instagram/snapinsta": eng_07,
  "instagram/snapsave": eng_08,
  "facebook/fdown": eng_09,
  "facebook/snapsave": eng_10,
  "twitter/direct": eng_11,
  "twitter/savetwt": eng_12,
  "twitter/tvd": eng_13,
  "twitter/tweeload": eng_14,
  "youtube/playlist": eng_15,
  "youtube/ytmp3": eng_16,
  "youtube/ytmp3gg": eng_17,
  "pinterest/direct": eng_18,
  "pinterest/pindown": eng_19,
  "threads/threadster": eng_20,
  "reddit/rapidsave": eng_21,
  "terabox/sechno": eng_22,
  "soundcloud/klickaud": eng_23,
  "douyin/direct": eng_24,
  "pixiv/ajax": eng_25,
  "spotify/soundloaders": eng_26,
  "spotify/spotidown": eng_27,
  "spotify/spotisaver": eng_28,
  "spotify/spotmate": eng_29,
  "anime/animetosho": eng_30,
  "anime/gogoanime": eng_31,
  "anime/nimegami": eng_32,
  "anime/otakudesu": eng_33,
  "comic/asurascans": eng_34,
  "comic/bacakomik": eng_35,
  "comic/kiryuu": eng_36,
  "comic/komikcast": eng_37,
  "comic/komikindo": eng_38,
  "comic/komiku": eng_39,
  "comic/mangabats": eng_40,
  "comic/mangadex": eng_41,
  "comic/manhwaindo": eng_42,
  "resolver/catbox": eng_43,
  "resolver/doodstream": eng_44,
  "resolver/gdrive": eng_45,
  "resolver/krakenfiles": eng_46,
  "resolver/mediafire": eng_47,
  "resolver/pixeldrain": eng_48,
  "resolver/rekonise": eng_49,
  "resolver/safelinku": eng_50,
  "resolver/sfile": eng_51,
  "resolver/sub2unlock": eng_52,
  "resolver/unshorten": eng_53,
};

/** Cari modul engine berdasar `kategori_scrapr/nama_engine`. */
export function getEngineModule(key: string): EngineModule | undefined {
  return ENGINE_MAP[key];
}
