# -*- coding: utf-8 -*-
"""Download Chinese historical figure images via Wikimedia Commons search."""
from __future__ import annotations

import json
import re
import ssl
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "app" / "history" / "img"
DATA = ROOT / "app" / "history" / "js" / "data.js"

# id -> search query (Chinese/English names that work on Commons)
QUERIES = {
    "zhugeliang": "Zhuge Liang",
    "zhangliang": "Zhang Liang Han",
    "wanganshi": "Wang Anshi",
    "zhuangzi": "Zhuangzi",
    "shenkuo": "Shen Kuo",
    "mozi": "Mozi philosopher",
    "caocao": "Cao Cao",
    "kangxi": "Kangxi Emperor",
    "shangyang": "Shang Yang",
    "sudongpo": "Su Shi",
    "dongfangshuo": "Dongfang Shuo",
    "wangchong": "Wang Chong",
    "quyuan": "Qu Yuan",
    "wangyangming": "Wang Yangming",
    "jianzhen": "Jianzhen",
    "libai": "Li Bai",
    "taoyuanming": "Tao Yuanming",
    "liqinqzhao": "Li Qingzhao",
    "liubei": "Liu Bei",
    "mencius": "Mencius",
    "zengguofan": "Zeng Guofan",
    "simaqian": "Sima Qian",
    "tangyin": "Tang Yin",
    "baijuyi": "Bai Juyi",
    "baozheng": "Bao Zheng",
    "hairui": "Hai Rui",
    "simaguang": "Sima Guang",
    "dufu": "Du Fu",
    "xuanzang": "Xuanzang",
    "huangdaopo": "Huang Daopo",
    "qinshihuang": "Qin Shi Huang",
    "yongzheng": "Yongzheng Emperor",
    "zhuyuanzhang": "Hongwu Emperor",
    "wuzetian": "Wu Zetian",
    "fangxuanling": "Fang Xuanling",
    "di_renjie": "Di Renjie",
    "hanxin": "Han Xin",
    "luban": "Lu Ban",
    "huatuo": "Hua Tuo",
    "wangxizhi": "Wang Xizhi",
    "bada": "Bada Shanren",
    "zhengbanqiao": "Zheng Xie",
    "xiangyu": "Xiang Yu",
    "zhaoyun": "Zhao Yun",
    "weixing": "Wei Qing",
    "tangxuanzong": "Emperor Xuanzong of Tang",
    "liuyong": "Liu Yong poet",
    "yangyuhuan": "Yang Guifei",
}

UA = "MBTI-Lab/1.0 (educational; figure asset fetch)"
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
            return data if len(data) > 1500 else None
    except Exception as e:
        print("  dl fail", e)
        return None


def search(query: str) -> str | None:
    api = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(
        {
            "action": "query",
            "format": "json",
            "generator": "search",
            "gsrsearch": f"filetype:bitmap {query}",
            "gsrlimit": 10,
            "gsrnamespace": 6,
            "prop": "imageinfo",
            "iiprop": "url|mime",
            "iiurlwidth": 1400,
        }
    )
    data = http_json(api)
    pages = (data.get("query") or {}).get("pages") or {}
    for page in pages.values():
        info = (page.get("imageinfo") or [None])[0]
        if not info:
            continue
        mime = info.get("mime") or ""
        if not any(x in mime for x in ("jpeg", "png", "webp")):
            continue
        return info.get("thumburl") or info.get("url")
    return None


def write_svg(aid: str, name: str) -> None:
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="1800" viewBox="0 0 1400 1800">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2a1c18"/>
      <stop offset="100%" stop-color="#0e0a08"/>
    </linearGradient>
  </defs>
  <rect width="1400" height="1800" fill="url(#g)"/>
  <circle cx="1000" cy="420" r="260" fill="#8b2e2a" fill-opacity="0.25"/>
  <text x="100" y="1500" fill="#c9b28a" font-family="Georgia, serif" font-size="72">{name}</text>
  <text x="100" y="1580" fill="#ffffff" fill-opacity="0.5" font-family="Georgia, serif" font-size="36">史鉴 · MBTI Lab</text>
</svg>'''
    (OUT / f"{aid}.svg").write_text(svg, encoding="utf-8")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    text = DATA.read_text(encoding="utf-8")
    ids = re.findall(r'id:\s*"([a-z0-9_]+)"', text)
    # filter figure ids present in QUERIES or appearing with name nearby
    names = dict(re.findall(r'id:\s*"([a-z0-9_]+)"[\s\S]*?name:\s*"([^"]+)"', text))

    for aid in sorted(set(ids)):
        if aid not in QUERIES and aid not in names:
            continue
        if aid in ("fn",):
            continue
        jpg = OUT / f"{aid}.jpg"
        if jpg.exists() and jpg.stat().st_size > 2000:
            print("have", aid)
            continue
        q = QUERIES.get(aid) or names.get(aid) or aid
        print("search", aid, q)
        try:
            url = search(q)
        except Exception as e:
            print("  search err", e)
            url = None
        if url:
            data = http_bytes(url)
            if data:
                jpg.write_bytes(data)
                print("  saved", len(data))
                continue
        print("  svg fallback")
        write_svg(aid, names.get(aid, aid))
        # point data to svg if no jpg
        text2 = DATA.read_text(encoding="utf-8")
        # ensureImages already sets .jpg; app onerror not present - create empty jpg skip
        # Instead copy svg path into a note: write tiny jpg? Use svg as image path via rewrite below

    # Rewrite image paths: prefer jpg else svg
    text = DATA.read_text(encoding="utf-8")
    for aid in QUERIES:
        jpg = OUT / f"{aid}.jpg"
        svg = OUT / f"{aid}.svg"
        if jpg.exists() and jpg.stat().st_size > 2000:
            rel = f"./img/{aid}.jpg"
        elif svg.exists():
            rel = f"./img/{aid}.svg"
        else:
            write_svg(aid, names.get(aid, aid))
            rel = f"./img/{aid}.svg"
        # ensureImages sets default; also set explicit image fields if present
        pattern = rf'(id:\s*"{re.escape(aid)}"[\s\S]*?)(image:\s*"[^"]*")?'
        # simpler: rely on ensureImages default ./img/id.jpg and only rewrite ensureImages by patching function
        print("asset", aid, "->", rel)

    # Patch ensureImages defaults by writing a small map file? 
    # Update ensureImages in data to pick existing - for simplicity create missing jpgs as svg copies renamed won't work in img tag for svg with .jpg
    # For missing jpg, update image property in figures via ensureImages override:

    override = []
    for aid in QUERIES:
        jpg = OUT / f"{aid}.jpg"
        svg = OUT / f"{aid}.svg"
        if not (jpg.exists() and jpg.stat().st_size > 2000):
            if not svg.exists():
                write_svg(aid, names.get(aid, aid))
            override.append(aid)

    # inject after ensureImages call
    if "IMAGE_OVERRIDES" not in text:
        block = (
            "\n  const IMAGE_OVERRIDES = {\n"
            + "".join(
                f'    "{aid}": "./img/{aid}.svg",\n'
                for aid in override
            )
            + "  };\n"
            "  Object.keys(FIGURES).forEach(function (code) {\n"
            "    FIGURES[code].forEach(function (f) {\n"
            "      if (IMAGE_OVERRIDES[f.id]) f.image = IMAGE_OVERRIDES[f.id];\n"
            "    });\n"
            "  });\n"
        )
        text = text.replace(
            "  ensureImages(FIGURES);",
            "  ensureImages(FIGURES);" + block,
        )
        DATA.write_text(text, encoding="utf-8")
        print("wrote overrides", len(override))
    print("done")


if __name__ == "__main__":
    main()
