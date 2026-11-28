# -*- coding: utf-8 -*-
"""Recompose 史鉴/寰鉴/漫鉴 posters with face-aware crop and refined chrome."""
from __future__ import annotations

import io
import json
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build_portrait_posters import (  # noqa: E402
    BRAND,
    HISTORY_QUERIES,
    WORLD_QUERIES,
    compose_poster,
    extract_meta,
    extract_pairs,
    http_bytes,
    search_commons,
)
from compose_ai_posters import find_asset  # noqa: E402
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]


def ensure_raw(kind: str, aid: str, query: str, raw_path: Path) -> bool:
    if raw_path.exists() and raw_path.stat().st_size > 4000:
        return True
    print("fetch", kind, aid, query)
    try:
        url = search_commons(query)
    except Exception as e:
        print("  search err", e)
        return False
    if not url:
        print("  no url")
        return False
    data = http_bytes(url)
    if not data:
        print("  no bytes")
        return False
    raw_path.write_bytes(data)
    print("  raw", len(data))
    time.sleep(0.8)
    return True


def recompose_hw(kind: str, queries: dict[str, str], refetch_missing: bool = True):
    out = ROOT / "app" / kind / "img"
    raw = out / "_raw"
    raw.mkdir(parents=True, exist_ok=True)
    meta = extract_meta(ROOT / f"app/{kind}/js/data.js")
    names = extract_pairs(ROOT / f"app/{kind}/js/data.js")
    brand_cn, brand_en, accent = BRAND[kind]
    n = 0
    fails = []
    for aid, q in queries.items():
        raw_path = raw / f"{aid}.jpg"
        if refetch_missing:
            ensure_raw(kind, aid, q, raw_path)
        src = raw_path if raw_path.exists() and raw_path.stat().st_size > 4000 else out / f"{aid}.jpg"
        if not src.exists():
            fails.append(aid)
            print("skip", kind, aid)
            continue
        name = names.get(aid, aid)
        dynasty = (meta.get(aid) or ("", "", ""))[1]
        title = (meta.get(aid) or ("", "", ""))[2]
        subtitle = " · ".join(x for x in (dynasty, title) if x) or brand_cn
        im = Image.open(io.BytesIO(src.read_bytes()))
        poster = compose_poster(im, name, subtitle, brand_cn, brand_en, accent)
        dest = out / f"{aid}.jpg"
        tmp = out / f".{aid}.tmp.jpg"
        poster.save(tmp, "JPEG", quality=93, optimize=True)
        tmp.replace(dest)
        n += 1
        print("ok", kind, aid)
    print(kind, "composed", n, "fail", fails)


def recompose_anime():
    anime = json.loads((ROOT / "scripts/anime_portrait_manifest.json").read_text(encoding="utf-8"))
    brand_cn, brand_en, accent = BRAND["anime"]
    out = ROOT / "app/anime/img"
    n = 0
    missing = []
    for it in anime:
        src = find_asset(it["id"])
        if not src:
            # fallback: existing jpg (may already be composed)
            fallback = out / f'{it["id"]}.jpg'
            if fallback.exists():
                src = fallback
            else:
                missing.append(it["id"])
                continue
        im = Image.open(src)
        subtitle = f'{it["series"]} · {it["title"]}'
        poster = compose_poster(im, it["name"], subtitle, brand_cn, brand_en, accent)
        poster.save(out / f'{it["id"]}.jpg', "JPEG", quality=93, optimize=True)
        n += 1
        print("ok anime", it["id"])
    print("anime composed", n, "missing", missing)


if __name__ == "__main__":
    only = sys.argv[1:]
    if not only or "history" in only:
        recompose_hw("history", HISTORY_QUERIES, refetch_missing=True)
    if not only or "world" in only:
        recompose_hw("world", WORLD_QUERIES, refetch_missing=False)
    if not only or "anime" in only:
        recompose_anime()
