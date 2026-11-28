# -*- coding: utf-8 -*-
"""Retry missing history/world jpg posters with slower Commons fetches."""
from __future__ import annotations

import io
import time
from pathlib import Path

from build_portrait_posters import (
    HISTORY_QUERIES,
    WORLD_QUERIES,
    BRAND,
    compose_poster,
    extract_meta,
    extract_pairs,
    http_bytes,
    search_commons,
)
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]


def retry(kind: str, queries: dict):
    out = ROOT / "app" / kind / "img"
    raw = out / "_raw"
    raw.mkdir(parents=True, exist_ok=True)
    meta = extract_meta(ROOT / f"app/{kind}/js/data.js")
    names = extract_pairs(ROOT / f"app/{kind}/js/data.js")
    brand_cn, brand_en, accent = BRAND[kind]
    missing = [aid for aid in queries if not ((out / f"{aid}.jpg").exists() and (out / f"{aid}.jpg").stat().st_size > 5000)]
    print(kind, "retry", len(missing), missing)
    for aid in missing:
        q = queries[aid]
        name = names.get(aid, aid)
        dynasty = (meta.get(aid) or ("", "", ""))[1]
        title = (meta.get(aid) or ("", "", ""))[2]
        subtitle = " · ".join(x for x in (dynasty, title) if x) or brand_cn
        raw_path = raw / f"{aid}.jpg"
        print("fetch", aid, q)
        url = None
        for attempt in range(3):
            try:
                url = search_commons(q)
                break
            except Exception as e:
                print("  err", e)
                time.sleep(2 + attempt * 3)
        if url:
            data = http_bytes(url)
            if data:
                raw_path.write_bytes(data)
        time.sleep(1.2)
        if raw_path.exists() and raw_path.stat().st_size > 2000:
            im = Image.open(io.BytesIO(raw_path.read_bytes()))
            poster = compose_poster(im, name, subtitle, brand_cn, brand_en, accent)
            poster.save(out / f"{aid}.jpg", "JPEG", quality=90, optimize=True)
            print("  ok", aid)
        else:
            print("  fail", aid)


def patch_resolve():
    for kind in ("history", "world", "anime"):
        path = ROOT / f"app/{kind}/js/data.js"
        text = path.read_text(encoding="utf-8")
        import re

        text2, n = re.subn(
            r"function resolveImage\(id\) \{[\s\S]*?\n  \}",
            'function resolveImage(id) {\n    return "./img/" + id + ".jpg?v=5";\n  }',
            text,
            count=1,
        )
        if kind == "history":
            text2 = re.sub(
                r"if \(IMAGE_OVERRIDES\[f\.id\]\)[\s\S]*?\n      \}",
                'if (IMAGE_OVERRIDES[f.id]) {\n        f.image = "./img/" + f.id + ".jpg?v=5";\n      }',
                text2,
                count=1,
            )
        if n:
            path.write_text(text2, encoding="utf-8")
            print("patched", kind)
        else:
            print("no patch", kind)


if __name__ == "__main__":
    retry("history", HISTORY_QUERIES)
    retry("world", WORLD_QUERIES)
    patch_resolve()
