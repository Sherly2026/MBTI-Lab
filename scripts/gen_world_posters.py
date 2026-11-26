# -*- coding: utf-8 -*-
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "app" / "world" / "img"
DATA = ROOT / "app" / "world" / "js" / "data.js"
OUT.mkdir(parents=True, exist_ok=True)
text = DATA.read_text(encoding="utf-8")
pairs = re.findall(r'id:\s*"([a-z0-9_]+)"\s*,\s*\n\s*name:\s*"([^"]+)"', text)
colors = [
    ("#1c2a33", "#0a1218", "#9eb6d4"),
    ("#1a2838", "#0a1218", "#c9b28a"),
    ("#243040", "#0c141c", "#8ec4b8"),
    ("#302820", "#141008", "#e0b86a"),
]
for i, (aid, name) in enumerate(pairs):
    from_, to, accent = colors[i % len(colors)]
    mark = name[:1]
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="1800" viewBox="0 0 1400 1800">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{from_}"/>
      <stop offset="100%" stop-color="{to}"/>
    </linearGradient>
    <radialGradient id="r" cx="70%" cy="20%" r="50%">
      <stop offset="0%" stop-color="{accent}" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="{accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1400" height="1800" fill="url(#g)"/>
  <rect width="1400" height="1800" fill="url(#r)"/>
  <rect x="80" y="120" width="8" height="220" fill="{accent}"/>
  <text x="110" y="200" fill="{accent}" font-family="Noto Serif SC, Georgia, serif" font-size="42">寰鉴</text>
  <text x="110" y="1280" fill="#f4f7fb" font-family="Noto Serif SC, Georgia, serif" font-size="84">{name}</text>
  <text x="110" y="1360" fill="#f4f7fb" fill-opacity="0.55" font-family="Georgia, serif" font-size="34">MBTI Lab · World Persona</text>
  <text x="1050" y="1680" fill="#ffffff" fill-opacity="0.1" font-family="Noto Serif SC, Georgia, serif" font-size="360" text-anchor="middle">{mark}</text>
</svg>
"""
    (OUT / f"{aid}.svg").write_text(svg, encoding="utf-8")
print("posters", len(pairs))
