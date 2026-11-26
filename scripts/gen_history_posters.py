# -*- coding: utf-8 -*-
"""Generate SVG posters for every history figure id (guaranteed local art)."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "app" / "history" / "img"
DATA = ROOT / "app" / "history" / "js" / "data.js"

OUT.mkdir(parents=True, exist_ok=True)
text = DATA.read_text(encoding="utf-8")
pairs = re.findall(r'id:\s*"([a-z0-9_]+)"\s*,\s*\n\s*name:\s*"([^"]+)"', text)

colors = [
    ("#1c2a33", "#0a1218", "#c9b28a"),
    ("#2a1c18", "#0e0a08", "#d4a090"),
    ("#1a3030", "#081414", "#8ec4b8"),
    ("#302418", "#141008", "#e0b86a"),
    ("#241c28", "#100c14", "#c4a0c0"),
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
    <radialGradient id="r" cx="72%" cy="22%" r="50%">
      <stop offset="0%" stop-color="{accent}" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="{accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1400" height="1800" fill="url(#g)"/>
  <rect width="1400" height="1800" fill="url(#r)"/>
  <rect x="80" y="120" width="8" height="220" fill="{accent}"/>
  <text x="110" y="200" fill="{accent}" font-family="Noto Serif SC, Georgia, serif" font-size="42">史鉴</text>
  <text x="110" y="1280" fill="#f7f3ec" font-family="Noto Serif SC, Georgia, serif" font-size="96">{name}</text>
  <text x="110" y="1360" fill="#f7f3ec" fill-opacity="0.55" font-family="Georgia, serif" font-size="36">MBTI Lab · Historical Persona</text>
  <text x="1050" y="1680" fill="#ffffff" fill-opacity="0.1" font-family="Noto Serif SC, Georgia, serif" font-size="380" text-anchor="middle">{mark}</text>
</svg>
"""
    path = OUT / f"{aid}.svg"
    path.write_text(svg, encoding="utf-8")
    print("svg", aid, name)

# Point all images to local svg (photos can replace later as .jpg)
# Update ensureImages to prefer jpg then svg
if "preferSvgFallback" not in text:
    patch = """
  function resolveImage(id) {
    // runtime cannot stat files; default svg posters always exist
    return "./img/" + id + ".svg";
  }
"""
    text = text.replace(
        "  function ensureImages(figuresMap) {\n    Object.keys(figuresMap).forEach(function (code) {\n      figuresMap[code].forEach(function (f) {\n        if (!f.image) f.image = \"./img/\" + f.id + \".jpg\";\n        f.tone = f.tone || null;\n      });\n    });\n  }",
        patch
        + """  function ensureImages(figuresMap) {
    Object.keys(figuresMap).forEach(function (code) {
      figuresMap[code].forEach(function (f) {
        f.image = resolveImage(f.id);
        f.tone = f.tone || null;
      });
    });
  }""",
    )
    DATA.write_text(text, encoding="utf-8")

print("figures", len(pairs))
