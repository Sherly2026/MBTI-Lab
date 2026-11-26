# -*- coding: utf-8 -*-
import re
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "app" / "anime" / "img"
DATA = Path(__file__).resolve().parents[1] / "app" / "anime" / "js" / "data.js"
OUT.mkdir(parents=True, exist_ok=True)
text = DATA.read_text(encoding="utf-8")
pairs = re.findall(r'id:\s*"([a-z0-9_]+)"\s*,\s*\n\s*name:\s*"([^"]+)"', text)
colors = [
    ("#2a1c28", "#100c14", "#e8a0b8"),
    ("#1c2830", "#0a1218", "#7ec4d4"),
    ("#302018", "#141008", "#e0b070"),
    ("#1a3030", "#0a1414", "#90d0b0"),
]
for i, (aid, name) in enumerate(pairs):
    fr, to, ac = colors[i % 4]
    mark = name[:1]
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="1800" viewBox="0 0 1400 1800">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{fr}"/>
      <stop offset="100%" stop-color="{to}"/>
    </linearGradient>
    <radialGradient id="r" cx="70%" cy="20%" r="50%">
      <stop offset="0%" stop-color="{ac}" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="{ac}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1400" height="1800" fill="url(#g)"/>
  <rect width="1400" height="1800" fill="url(#r)"/>
  <rect x="80" y="120" width="8" height="220" fill="{ac}"/>
  <text x="110" y="200" fill="{ac}" font-family="Noto Serif SC, Georgia, serif" font-size="42">漫鉴</text>
  <text x="110" y="1260" fill="#f7f3f6" font-family="Noto Serif SC, Georgia, serif" font-size="72">{name}</text>
  <text x="110" y="1340" fill="#f7f3f6" fill-opacity="0.55" font-family="Georgia, serif" font-size="32">MBTI Lab · Anime Persona</text>
  <text x="1050" y="1680" fill="#ffffff" fill-opacity="0.1" font-family="Noto Serif SC, Georgia, serif" font-size="320" text-anchor="middle">{mark}</text>
</svg>
"""
    (OUT / f"{aid}.svg").write_text(svg, encoding="utf-8")
print("posters", len(pairs))
