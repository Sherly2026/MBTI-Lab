# -*- coding: utf-8 -*-
"""Compose AI portraits from Cursor assets into app/anime/img/*.jpg posters."""
from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build_portrait_posters import compose_poster  # noqa: E402
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path(r"C:\Users\Sherly天秤\.cursor\projects\c-Users-Sherly-MBTI-Lab\assets")
OUT = ROOT / "app" / "anime" / "img"
BRAND = ("漫鉴", "ANIME", (232, 160, 184))


def find_asset(aid: str) -> Path | None:
    cands = []
    for p in ASSETS.glob("*"):
        if p.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
            continue
        stem = p.stem.lower()
        if stem == aid.lower() or stem.startswith(aid.lower() + "_") or stem.endswith("_" + aid.lower()):
            cands.append(p)
    if not cands:
        return None
    cands.sort(key=lambda p: p.stat().st_mtime, reverse=True)
    return cands[0]


def main(only: list[str] | None = None):
    anime = json.loads((ROOT / "scripts/anime_portrait_manifest.json").read_text(encoding="utf-8"))
    OUT.mkdir(parents=True, exist_ok=True)
    brand_cn, brand_en, accent = BRAND
    n = 0
    missing = []
    for it in anime:
        aid = it["id"]
        if only and aid not in only:
            continue
        src = find_asset(aid)
        if not src:
            missing.append(aid)
            continue
        im = Image.open(src)
        subtitle = f'{it["series"]} · {it["title"]}'
        poster = compose_poster(im, it["name"], subtitle, brand_cn, brand_en, accent)
        poster.save(OUT / f"{aid}.jpg", "JPEG", quality=91, optimize=True)
        n += 1
        print("ok", aid, "<-", src.name)
    print("composed", n, "missing", len(missing))
    if missing:
        print("missing_ids", ",".join(missing[:40]))


if __name__ == "__main__":
    ids = sys.argv[1:] or None
    main(ids)
