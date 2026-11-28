# -*- coding: utf-8 -*-
"""Recompose all posters from raw/AI sources without burned-in names."""
from __future__ import annotations

import io
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build_portrait_posters import (  # noqa: E402
    BRAND,
    HISTORY_QUERIES,
    WORLD_QUERIES,
    compose_poster,
    extract_meta,
    extract_pairs,
)
from compose_ai_posters import find_asset  # noqa: E402
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]


def recompose_hw(kind: str, queries: dict):
    out = ROOT / "app" / kind / "img"
    raw = out / "_raw"
    meta = extract_meta(ROOT / f"app/{kind}/js/data.js")
    names = extract_pairs(ROOT / f"app/{kind}/js/data.js")
    brand_cn, brand_en, accent = BRAND[kind]
    n = 0
    for aid in queries:
        src = raw / f"{aid}.jpg"
        if not src.exists() or src.stat().st_size < 2000:
            # maybe only final jpg exists
            src = out / f"{aid}.jpg"
            if not src.exists():
                print("skip", kind, aid)
                continue
        name = names.get(aid, aid)
        dynasty = (meta.get(aid) or ("", "", ""))[1]
        title = (meta.get(aid) or ("", "", ""))[2]
        subtitle = " · ".join(x for x in (dynasty, title) if x) or brand_cn
        im = Image.open(io.BytesIO(src.read_bytes()))
        # If recomposing from an already-composed poster, still ok visually
        poster = compose_poster(im, name, subtitle, brand_cn, brand_en, accent)
        poster.save(out / f"{aid}.jpg", "JPEG", quality=91, optimize=True)
        n += 1
    print(kind, n)


def recompose_anime():
    anime = json.loads((ROOT / "scripts/anime_portrait_manifest.json").read_text(encoding="utf-8"))
    brand_cn, brand_en, accent = BRAND["anime"]
    out = ROOT / "app/anime/img"
    n = 0
    for it in anime:
        src = find_asset(it["id"])
        if not src:
            print("missing asset", it["id"])
            continue
        im = Image.open(src)
        subtitle = f'{it["series"]} · {it["title"]}'
        poster = compose_poster(im, it["name"], subtitle, brand_cn, brand_en, accent)
        poster.save(out / f'{it["id"]}.jpg', "JPEG", quality=91, optimize=True)
        n += 1
    print("anime", n)


if __name__ == "__main__":
    recompose_hw("history", HISTORY_QUERIES)
    recompose_hw("world", WORLD_QUERIES)
    recompose_anime()
