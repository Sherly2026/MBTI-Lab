# -*- coding: utf-8 -*-
"""Copy AI hero assets into history/_raw and compose posters."""
from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build_portrait_posters import BRAND, compose_poster, extract_meta, extract_pairs  # noqa: E402
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path(r"C:\Users\Sherly天秤\.cursor\projects\c-Users-Sherly-MBTI-Lab\assets")

# kind -> {figure id -> asset stem}
HEROES = {
    "history": {
        "zhugeliang": "zhugeliang_hero",
        "libai": "libai_hero",
        "caocao": "caocao_hero",
        "quyuan": "quyuan_hero",
        "wuzetian": "wuzetian_hero",
        "sudongpo": "sudongpo_hero",
        "yangyuhuan": "yangyuhuan_hero",
        "liubei": "liubei_hero",
        "mencius": "mencius_hero",
        "qinshihuang": "qinshihuang_hero",
        "zhaoyun": "zhaoyun_hero",
    },
    "world": {
        "newton": "newton_hero",
        "cleopatra": "cleopatra_hero",
    },
}


def find_hero(stem: str) -> Path | None:
    for p in ASSETS.glob(stem + ".*"):
        if p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}:
            return p
    return None


def apply_kind(kind: str, mapping: dict[str, str]):
    meta = extract_meta(ROOT / f"app/{kind}/js/data.js")
    names = extract_pairs(ROOT / f"app/{kind}/js/data.js")
    brand_cn, brand_en, accent = BRAND[kind]
    raw_dir = ROOT / f"app/{kind}/img/_raw"
    out_dir = ROOT / f"app/{kind}/img"
    raw_dir.mkdir(parents=True, exist_ok=True)
    for aid, stem in mapping.items():
        src = find_hero(stem)
        if not src:
            print("missing", kind, stem)
            continue
        raw = raw_dir / f"{aid}.jpg"
        im = Image.open(src).convert("RGB")
        im.save(raw, "JPEG", quality=95)
        name = names.get(aid, aid)
        dynasty = (meta.get(aid) or ("", "", ""))[1]
        title = (meta.get(aid) or ("", "", ""))[2]
        subtitle = " · ".join(x for x in (dynasty, title) if x) or brand_cn
        poster = compose_poster(im, name, subtitle, brand_cn, brand_en, accent)
        poster.save(out_dir / f"{aid}.jpg", "JPEG", quality=93, optimize=True)
        print("hero", kind, aid, "<-", src.name)


def main():
    for kind, mapping in HEROES.items():
        apply_kind(kind, mapping)


if __name__ == "__main__":
    main()
