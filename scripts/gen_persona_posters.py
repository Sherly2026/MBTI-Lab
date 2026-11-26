# -*- coding: utf-8 -*-
"""Regenerate SVG posters so the upper 55% carries visible art (works as <img>)."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

BRANDS = {
    "anime": ("漫鉴", "ANIME", "#e8a0b8"),
    "history": ("史鉴", "HISTORY", "#c9b28a"),
    "world": ("寰鉴", "WORLD", "#8ab0c8"),
}

PALETTES = {
    "anime": [
        ("#2a1c28", "#100c14", "#e8a0b8"),
        ("#1c2830", "#0a1218", "#7ec4d4"),
        ("#302018", "#141008", "#e0b070"),
        ("#1a3030", "#0a1414", "#90d0b0"),
        ("#241828", "#100c14", "#d4a0c8"),
        ("#1c2420", "#0a100e", "#a8c090"),
    ],
    "history": [
        ("#1c2a33", "#0a1218", "#c9b28a"),
        ("#2a1c18", "#0e0a08", "#d4a090"),
        ("#1a3030", "#081414", "#8ec4b8"),
        ("#302418", "#141008", "#e0b86a"),
        ("#241c28", "#100c14", "#c4a0c0"),
        ("#1c2820", "#0a120e", "#a8c49a"),
    ],
    "world": [
        ("#1a2838", "#081018", "#8ab0c8"),
        ("#2a2418", "#100e08", "#d4b878"),
        ("#1c3030", "#0a1414", "#7ec4b0"),
        ("#281c28", "#100c14", "#c8a0b8"),
        ("#1c2430", "#0a1018", "#90a8c8"),
        ("#302018", "#140e08", "#e0a878"),
    ],
}


def extract_pairs(data_text: str):
    return re.findall(r'id:\s*"([a-z0-9_]+)"\s*,\s*\n\s*name:\s*"([^"]+)"', data_text)


def make_svg(aid: str, name: str, brand_cn: str, brand_en: str, colors: tuple[str, str, str]) -> str:
    fr, to, ac = colors
    mark = name[:1]
    mono = (aid.replace("_", " ")[:12]).upper()
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="1800" viewBox="0 0 1400 1800">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{fr}"/>
      <stop offset="100%" stop-color="{to}"/>
    </linearGradient>
    <radialGradient id="r" cx="50%" cy="32%" r="45%">
      <stop offset="0%" stop-color="{ac}" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="{ac}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.08"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.25"/>
    </linearGradient>
  </defs>
  <rect width="1400" height="1800" fill="url(#g)"/>
  <rect width="1400" height="1800" fill="url(#r)"/>
  <rect width="1400" height="1800" fill="url(#sheen)"/>

  <!-- upper composition (visible above result caption) -->
  <circle cx="700" cy="520" r="310" fill="none" stroke="{ac}" stroke-width="2" opacity="0.35"/>
  <circle cx="700" cy="520" r="230" fill="none" stroke="{ac}" stroke-width="6" opacity="0.55"/>
  <circle cx="700" cy="520" r="170" fill="{ac}" fill-opacity="0.14"/>
  <text x="700" y="590" text-anchor="middle" fill="{ac}" fill-opacity="0.95"
        font-family="Georgia, 'Times New Roman', serif" font-size="200">{mark}</text>

  <rect x="80" y="100" width="10" height="160" fill="{ac}"/>
  <text x="110" y="155" fill="{ac}" font-family="Georgia, serif" font-size="36" letter-spacing="6">{brand_en}</text>
  <text x="110" y="220" fill="#f7f3ec" fill-opacity="0.9"
        font-family="'Microsoft YaHei', 'PingFang SC', 'Noto Sans SC', sans-serif" font-size="44">{brand_cn}</text>

  <!-- name stays in HTML caption to avoid double-text overlap -->
  <rect x="80" y="320" width="180" height="4" fill="{ac}" opacity="0.55"/>
  <text x="1100" y="1680" fill="#ffffff" fill-opacity="0.08"
        font-family="Georgia, serif" font-size="280" text-anchor="middle">{mark}</text>
</svg>
"""


def run(kind: str) -> int:
    brand_cn, brand_en, _ = BRANDS[kind]
    data = (ROOT / f"app/{kind}/js/data.js").read_text(encoding="utf-8")
    out = ROOT / f"app/{kind}/img"
    out.mkdir(parents=True, exist_ok=True)
    pairs = extract_pairs(data)
    palette = PALETTES[kind]
    for i, (aid, name) in enumerate(pairs):
        svg = make_svg(aid, name, brand_cn, brand_en, palette[i % len(palette)])
        (out / f"{aid}.svg").write_text(svg, encoding="utf-8")
    print(f"{kind}: {len(pairs)} posters")
    return len(pairs)


if __name__ == "__main__":
    kinds = sys.argv[1:] or ["anime", "history", "world"]
    total = 0
    for k in kinds:
        total += run(k)
    print("total", total)
