# -*- coding: utf-8 -*-
"""Fill missing animal images via Commons API search + SVG fallback."""
from __future__ import annotations

import json
import ssl
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "app" / "animal" / "img"

MISSING = {
    "intj-panther": "black leopard",
    "intj-raven": "common raven bird",
    "entp-magpie": "eurasian magpie",
    "infp-butterfly": "swallowtail butterfly",
    "estj-shepherd": "german shepherd dog",
    "estj-bee": "honey bee flower",
    "esfj-retriever": "golden retriever dog",
    "isfp-redpanda": "red panda",
    "isfp-swan": "mute swan",
    "estp-cheetah": "cheetah",
    "esfp-peacock": "peacock bird",
}

# Also ensure every jpg exists for all animals listed in data - generate SVG for any gap
ALL_IDS = [
    "intj-owl",
    "intj-panther",
    "intj-raven",
    "intp-octopus",
    "intp-cat",
    "entj-lion",
    "entj-eagle",
    "entp-fox",
    "entp-magpie",
    "infj-deer",
    "infj-snow-leopard",
    "infp-butterfly",
    "infp-bunny",
    "enfj-dolphin",
    "enfj-elephant",
    "enfp-otter",
    "enfp-parrot",
    "istj-beaver",
    "istj-albatross",
    "isfj-penguin",
    "isfj-koala",
    "estj-shepherd",
    "estj-bee",
    "esfj-retriever",
    "esfj-sparrow",
    "istp-lynx",
    "istp-shark",
    "isfp-redpanda",
    "isfp-swan",
    "estp-cheetah",
    "estp-wolf",
    "esfp-peacock",
    "esfp-meerkat",
]

NAMES = {
    "intj-owl": "夜鸮",
    "intj-panther": "黑豹",
    "intj-raven": "渡鸦",
    "intp-octopus": "章鱼",
    "intp-cat": "狸花猫",
    "entj-lion": "雄狮",
    "entj-eagle": "金雕",
    "entp-fox": "赤狐",
    "entp-magpie": "喜鹊",
    "infj-deer": "白鹿",
    "infj-snow-leopard": "雪豹",
    "infp-butterfly": "凤蝶",
    "infp-bunny": "野兔",
    "enfj-dolphin": "海豚",
    "enfj-elephant": "非洲象",
    "enfp-otter": "水獭",
    "enfp-parrot": "金刚鹦鹉",
    "istj-beaver": "河狸",
    "istj-albatross": "信天翁",
    "isfj-penguin": "企鹅",
    "isfj-koala": "考拉",
    "estj-shepherd": "牧羊犬",
    "estj-bee": "蜜蜂",
    "esfj-retriever": "金毛寻回犬",
    "esfj-sparrow": "麻雀",
    "istp-lynx": "猞猁",
    "istp-shark": "礁鲨",
    "isfp-redpanda": "小熊猫",
    "isfp-swan": "天鹅",
    "estp-cheetah": "猎豹",
    "estp-wolf": "灰狼",
    "esfp-peacock": "孔雀",
    "esfp-meerkat": "狐獴",
}

TONES = {
    "intj-owl": ("#1c2e2a", "#0a1210", "#c9b28a"),
    "intj-panther": ("#1a1f2e", "#090b12", "#8fa3b8"),
    "intj-raven": ("#241c22", "#0e090c", "#b7a0c4"),
    "intp-octopus": ("#163038", "#081116", "#7eb8c9"),
    "intp-cat": ("#2a241c", "#120e0a", "#d2a679"),
    "entj-lion": ("#3a2a12", "#140e06", "#e0b45c"),
    "entj-eagle": ("#1e2a38", "#0a1018", "#9eb6d4"),
    "entp-fox": ("#3a2414", "#160c06", "#e0945a"),
    "entp-magpie": ("#1a3030", "#0a1414", "#6ec4b8"),
    "infj-deer": ("#24322c", "#0c1410", "#d7d2c4"),
    "infj-snow-leopard": ("#1c2838", "#0a1018", "#a8b8cc"),
    "infp-butterfly": ("#2c2438", "#100c18", "#d4a8c8"),
    "infp-bunny": ("#2a3020", "#10140c", "#c4d49a"),
    "enfj-dolphin": ("#123038", "#061218", "#6ec0d4"),
    "enfj-elephant": ("#2e2a1c", "#14120c", "#d4c49a"),
    "enfp-otter": ("#14342e", "#081410", "#7ed0b8"),
    "enfp-parrot": ("#382818", "#160e08", "#f0a868"),
    "istj-beaver": ("#1c2c34", "#0a1216", "#8ab0c0"),
    "istj-albatross": ("#203028", "#0c1410", "#a8c4a0"),
    "isfj-penguin": ("#1c2e38", "#0a1218", "#b0c8d4"),
    "isfj-koala": ("#2c2820", "#12100c", "#d0c0a0"),
    "estj-shepherd": ("#2c2818", "#12100a", "#d4b86a"),
    "estj-bee": ("#303018", "#141408", "#e0d060"),
    "esfj-retriever": ("#2e2418", "#141008", "#e0b888"),
    "esfj-sparrow": ("#243028", "#0e1410", "#a8c8b0"),
    "istp-lynx": ("#1c2830", "#0a1014", "#90a8b8"),
    "istp-shark": ("#102830", "#061014", "#58a8c0"),
    "isfp-redpanda": ("#28301c", "#10140a", "#d0b898"),
    "isfp-swan": ("#203038", "#0c1418", "#d8d0c8"),
    "estp-cheetah": ("#383018", "#161208", "#f0c060"),
    "estp-wolf": ("#2c2c2c", "#101010", "#c0c0c0"),
    "esfp-peacock": ("#382828", "#160c0c", "#e090a0"),
    "esfp-meerkat": ("#303020", "#14140c", "#e0c878"),
}

UA = "MBTI-Lab/1.0 (educational; local asset fetch)"
CTX = ssl.create_default_context()


def http_json(url: str):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=45, context=CTX) as resp:
        return json.loads(resp.read().decode("utf-8"))


def http_bytes(url: str) -> bytes | None:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=60, context=CTX) as resp:
            data = resp.read()
            return data if len(data) > 2000 else None
    except Exception as e:
        print("  download fail", e)
        return None


def search_commons(query: str) -> str | None:
    api = (
        "https://commons.wikimedia.org/w/api.php?"
        + urllib.parse.urlencode(
            {
                "action": "query",
                "format": "json",
                "generator": "search",
                "gsrsearch": f"filetype:bitmap {query}",
                "gsrlimit": 8,
                "gsrnamespace": 6,
                "prop": "imageinfo",
                "iiprop": "url|mime|size",
                "iiurlwidth": 1400,
            }
        )
    )
    data = http_json(api)
    pages = (data.get("query") or {}).get("pages") or {}
    candidates = []
    for page in pages.values():
        info = (page.get("imageinfo") or [None])[0]
        if not info:
            continue
        mime = info.get("mime") or ""
        if "jpeg" not in mime and "png" not in mime and "webp" not in mime:
            continue
        url = info.get("thumburl") or info.get("url")
        if url:
            candidates.append(url)
    return candidates[0] if candidates else None


def write_svg(aid: str) -> Path:
    name = NAMES.get(aid, aid)
    from_, to, accent = TONES.get(aid, ("#1e3d36", "#0f1c1a", "#c4a574"))
    mark = name[:1]
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="1800" viewBox="0 0 1400 1800">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{from_}"/>
      <stop offset="100%" stop-color="{to}"/>
    </linearGradient>
    <radialGradient id="r" cx="70%" cy="25%" r="55%">
      <stop offset="0%" stop-color="{accent}" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="{accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1400" height="1800" fill="url(#g)"/>
  <rect width="1400" height="1800" fill="url(#r)"/>
  <circle cx="420" cy="720" r="220" fill="{accent}" fill-opacity="0.12"/>
  <circle cx="980" cy="1100" r="280" fill="#ffffff" fill-opacity="0.05"/>
  <text x="110" y="1520" fill="{accent}" fill-opacity="0.9" font-family="Georgia, serif" font-size="72">{name}</text>
  <text x="110" y="1600" fill="#ffffff" fill-opacity="0.55" font-family="Georgia, serif" font-size="36">MBTI Lab · 灵塑</text>
  <text x="980" y="1680" fill="#ffffff" fill-opacity="0.1" font-family="Georgia, serif" font-size="420" text-anchor="middle">{mark}</text>
</svg>
'''
    path = OUT / f"{aid}.svg"
    path.write_text(svg, encoding="utf-8")
    return path


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    for aid, query in MISSING.items():
        jpg = OUT / f"{aid}.jpg"
        if jpg.exists() and jpg.stat().st_size > 2000:
            print("have", aid)
            continue
        print("search", aid, query)
        try:
            url = search_commons(query)
        except Exception as e:
            print("  search err", e)
            url = None
        if not url:
            print("  no result")
            continue
        print("  get", url[:80])
        data = http_bytes(url)
        if not data:
            continue
        ext = ".jpg"
        if ".png" in url.lower():
            ext = ".png"
        dest = OUT / f"{aid}{ext}"
        dest.write_bytes(data)
        # normalize to .jpg name expected by data.js — if png, also copy path note
        if ext != ".jpg":
            # data.js expects .jpg; write jpg sibling by keeping bytes (browsers ok with wrong ext sometimes)
            # better: update to actual ext later; for now save as .jpg anyway
            jpg.write_bytes(data)
            if dest != jpg:
                dest.unlink(missing_ok=True)
        print("  saved", jpg.name, len(data))

    # SVG fallback for anything still missing a raster
    for aid in ALL_IDS:
        jpg = OUT / f"{aid}.jpg"
        svg = OUT / f"{aid}.svg"
        if jpg.exists() and jpg.stat().st_size > 2000:
            continue
        print("svg fallback", aid)
        write_svg(aid)
        # point will be updated in data if jpg missing — keep svg and update data.js


if __name__ == "__main__":
    main()
