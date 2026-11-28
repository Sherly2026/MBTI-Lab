# -*- coding: utf-8 -*-
"""
Fetch Wikimedia portraits for 史鉴/寰鉴 and compose refined vertical posters (JPG).
"""
from __future__ import annotations

import io
import json
import re
import ssl
import time
import urllib.parse
import urllib.request
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont
except ImportError:
    import subprocess, sys

    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow", "-q"])
    from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
UA = "MBTI-Lab/1.0 (educational persona posters; contact via GitHub Sherly2026/MBTI-Lab)"
CTX = ssl.create_default_context()

HISTORY_QUERIES = {
    "zhugeliang": "Zhuge Liang portrait painting face",
    "zhangliang": "Zhang Liang Han dynasty portrait",
    "wanganshi": "Wang Anshi portrait painting",
    "zhuangzi": "Zhuangzi philosopher portrait",
    "shenkuo": "Shen Kuo portrait",
    "mozi": "Mozi philosopher portrait",
    "caocao": "Cao Cao portrait painting",
    "kangxi": "Kangxi Emperor portrait painting",
    "shangyang": "Shang Yang Legalist portrait",
    "sudongpo": "Su Shi Dongpo portrait painting",
    "dongfangshuo": "Dongfang Shuo portrait",
    "wangchong": "Wang Chong Han philosopher",
    "quyuan": "Qu Yuan poet portrait painting",
    "wangyangming": "Wang Yangming portrait",
    "jianzhen": "Jianzhen monk portrait statue",
    "libai": "Li Bai poet portrait painting",
    "taoyuanming": "Tao Yuanming portrait painting",
    "liqinqzhao": "Li Qingzhao portrait painting",
    "liubei": "Liu Bei portrait painting",
    "mencius": "Mencius portrait painting",
    "zengguofan": "Zeng Guofan portrait photograph painting",
    "simaqian": "Sima Qian portrait painting",
    "tangyin": "Tang Yin painter portrait",
    "baijuyi": "Bai Juyi poet portrait",
    "baozheng": "Bao Zheng portrait painting",
    "hairui": "Hai Rui portrait painting",
    "simaguang": "Sima Guang portrait painting",
    "dufu": "Du Fu poet portrait painting",
    "xuanzang": "Xuanzang monk portrait painting",
    "huangdaopo": "Huang Daopo portrait",
    "qinshihuang": "Qin Shi Huang emperor portrait statue",
    "yongzheng": "Yongzheng Emperor portrait painting",
    "zhuyuanzhang": "Hongwu Emperor Zhu Yuanzhang portrait",
    "wuzetian": "Wu Zetian empress portrait painting",
    "fangxuanling": "Fang Xuanling Tang portrait",
    "di_renjie": "Di Renjie portrait painting",
    "hanxin": "Han Xin general portrait",
    "luban": "Lu Ban craftsman portrait",
    "huatuo": "Hua Tuo physician portrait",
    "wangxizhi": "Wang Xizhi calligrapher portrait",
    "bada": "Bada Shanren self portrait painting",
    "zhengbanqiao": "Zheng Xie Banqiao portrait",
    "xiangyu": "Xiang Yu Hegemon-King portrait",
    "zhaoyun": "Zhao Yun general portrait painting",
    "weixing": "Wei Qing Han general portrait",
    "tangxuanzong": "Emperor Xuanzong of Tang portrait",
    "liuyong": "Liu Yong Song dynasty poet",
    "yangyuhuan": "Yang Guifei portrait painting",
}

WORLD_QUERIES = {
    "newton": "Isaac Newton portrait",
    "tesla": "Nikola Tesla photograph",
    "einstein": "Albert Einstein 1921",
    "darwin": "Charles Darwin portrait",
    "descartes": "René Descartes portrait",
    "davinci": "Leonardo da Vinci self portrait",
    "machiavelli": "Niccolò Machiavelli portrait",
    "plato": "Plato bust sculpture",
    "kant": "Immanuel Kant portrait",
    "jung": "Carl Jung photograph",
    "napoleon": "Napoleon Bonaparte portrait",
    "caesar": "Julius Caesar bust",
    "bismarck": "Otto von Bismarck photograph",
    "elizabeth_i": "Elizabeth I Armada Portrait",
    "catherine": "Catherine the Great portrait",
    "frederick": "Frederick the Great",
    "washington": "George Washington portrait",
    "franklin": "Benjamin Franklin portrait",
    "cleopatra": "Cleopatra sculpture ancient",
    "alexander": "Alexander the Great mosaic",
    "gandhi": "Mahatma Gandhi photograph",
    "mlk": "Martin Luther King Jr photograph",
    "joan": "Joan of Arc painting",
    "teresa": "Mother Teresa photograph",
    "nightingale": "Florence Nightingale portrait",
    "eleanor": "Eleanor Roosevelt photograph",
    "austen": "Jane Austen portrait",
    "shakespeare": "William Shakespeare Chandos",
    "twain": "Mark Twain photograph",
    "wilde": "Oscar Wilde photograph",
    "heingway": "Ernest Hemingway photograph",
    "byron": "Lord Byron portrait",
    "vangogh": "Vincent van Gogh self portrait",
    "kahlo": "Frida Kahlo photograph",
    "chopin": "Frédéric Chopin portrait",
    "mozart": "Wolfgang Amadeus Mozart portrait",
    "chaplin": "Charlie Chaplin photograph",
    "edison": "Thomas Edison photograph",
    "ford": "Henry Ford photograph",
    "earhart": "Amelia Earhart photograph",
    "musashi": "Miyamoto Musashi painting",
    "roosevelt_t": "Theodore Roosevelt photograph",
    "voltaire": "Voltaire portrait",
    "rousseau": "Jean-Jacques Rousseau portrait",
    "pericles": "Pericles bust",
    "marie_antoinette": "Marie Antoinette portrait",
    "victoria": "Queen Victoria photograph",
    "thoreau": "Henry David Thoreau photograph",
}

BRAND = {
    "history": ("史鉴", "HISTORY", (201, 178, 138)),
    "world": ("寰鉴", "WORLD", (138, 176, 200)),
    "anime": ("漫鉴", "ANIME", (232, 160, 184)),
}


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
        print("  dl fail", e)
        return None


def search_commons(query: str) -> str | None:
    api = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(
        {
            "action": "query",
            "format": "json",
            "generator": "search",
            "gsrsearch": f"filetype:bitmap {query}",
            "gsrlimit": 12,
            "gsrnamespace": 6,
            "prop": "imageinfo",
            "iiprop": "url|mime|size",
            "iiurlwidth": 1600,
        }
    )
    data = http_json(api)
    pages = (data.get("query") or {}).get("pages") or {}
    ranked = []
    for page in pages.values():
        info = (page.get("imageinfo") or [None])[0]
        if not info:
            continue
        mime = info.get("mime") or ""
        if not any(x in mime for x in ("jpeg", "png", "webp")):
            continue
        url = info.get("thumburl") or info.get("url")
        if url:
            ranked.append((info.get("size") or 0, url))
    ranked.sort(reverse=True)
    return ranked[0][1] if ranked else None


def load_font(size: int, bold: bool = False):
    candidates = [
        "C:/Windows/Fonts/msyh.ttc",
        "C:/Windows/Fonts/msyhbd.ttc" if bold else "C:/Windows/Fonts/msyh.ttc",
        "C:/Windows/Fonts/simhei.ttf",
        "C:/Windows/Fonts/simsun.ttc",
        "C:/Windows/Fonts/georgia.ttf",
        "/System/Library/Fonts/PingFang.ttc",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for path in candidates:
        p = Path(path)
        if p.exists():
            try:
                return ImageFont.truetype(str(p), size=size)
            except Exception:
                continue
    return ImageFont.load_default()


def _detect_face_center(im: Image.Image) -> tuple[float, float] | None:
    """Reserved for optional face detectors; currently rely on saliency."""
    return None


def _saliency_center(im: Image.Image) -> tuple[float, float]:
    """Fallback: bias toward high-contrast / non-flat regions (faces/figures)."""
    try:
        import numpy as np
    except Exception:
        return (0.5, 0.32)
    small = im.convert("L").resize((64, 64), Image.Resampling.BILINEAR)
    arr = np.asarray(small, dtype=np.float32)
    gy, gx = np.gradient(arr)
    energy = np.hypot(gx, gy)
    # down-weight pure paper/calligraphy bands (very flat + very bright)
    flat = energy < np.percentile(energy, 35)
    bright = arr > 210
    energy = energy.copy()
    energy[flat & bright] *= 0.15
    # prefer upper-mid for portraits
    weights = np.linspace(1.25, 0.55, 64).reshape(64, 1)
    energy *= weights
    flat_e = energy.ravel()
    if flat_e.sum() <= 0:
        return (0.5, 0.32)
    idx = int(np.argmax(flat_e))
    yy, xx = divmod(idx, 64)
    return ((xx + 0.5) / 64, (yy + 0.5) / 64)


def cover_crop(im: Image.Image, tw: int, th: int) -> Image.Image:
    im = im.convert("RGB")
    cx, cy = _detect_face_center(im) or _saliency_center(im)
    # keep face in upper 40% of final frame
    target_y = 0.34
    scale = max(tw / im.width, th / im.height) * 1.02
    nw, nh = int(im.width * scale + 0.5), int(im.height * scale + 0.5)
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    face_x, face_y = cx * nw, cy * nh
    left = int(face_x - tw * 0.5)
    top = int(face_y - th * target_y)
    left = max(0, min(left, nw - tw))
    top = max(0, min(top, nh - th))
    return im.crop((left, top, left + tw, top + th))


def compose_poster(
    src: Image.Image,
    name: str,
    subtitle: str,
    brand_cn: str,
    brand_en: str,
    accent: tuple[int, int, int],
) -> Image.Image:
    W, H = 1400, 1800
    base = cover_crop(src, W, H)
    base = ImageEnhance.Color(base).enhance(1.1)
    base = ImageEnhance.Contrast(base).enhance(1.08)
    base = ImageEnhance.Sharpness(base).enhance(1.12)

    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)

    # soft cinematic vignette
    vig = Image.new("L", (W, H), 0)
    vd = ImageDraw.Draw(vig)
    vd.ellipse([-180, -220, W + 180, H + 80], fill=255)
    vig = vig.filter(ImageFilter.GaussianBlur(90))
    vig_rgba = Image.new("RGBA", (W, H), (6, 5, 4, 0))
    inv = Image.eval(vig, lambda p: 255 - p)
    vig_rgba.putalpha(inv.point(lambda p: int(p * 0.42)))
    overlay = Image.alpha_composite(overlay, vig_rgba)

    # bottom caption plate (keeps face clear above ~55%)
    for i in range(560):
        a = int(225 * (i / 560) ** 1.45)
        y = H - 560 + i
        d.line([(0, y), (W, y)], fill=(7, 6, 5, a))
    for i in range(150):
        a = int(70 * (1 - i / 150))
        d.line([(0, i), (W, i)], fill=(7, 6, 5, a))

    # thin frame
    d.rectangle([36, 36, W - 36, H - 36], outline=accent + (120,), width=2)
    d.rectangle([48, 48, W - 48, H - 48], outline=(255, 255, 255, 28), width=1)

    # accent bar + brand glow
    d.rectangle([72, 88, 84, 248], fill=accent + (235,))
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([860, 40, 1420, 560], fill=accent + (36,))
    glow = glow.filter(ImageFilter.GaussianBlur(52))
    overlay = Image.alpha_composite(overlay, glow)

    out = Image.alpha_composite(base.convert("RGBA"), overlay)
    draw = ImageDraw.Draw(out)

    font_brand_en = load_font(32)
    font_brand_cn = load_font(48, bold=True)
    draw.text((104, 108), brand_en, font=font_brand_en, fill=accent + (255,))
    draw.text((104, 156), brand_cn, font=font_brand_cn, fill=(247, 243, 236, 250))
    # Name stays in HTML caption — only subtle footer chrome here.
    draw.rectangle([96, 1696, 340, 1702], fill=accent + (210,))
    draw.text((100, 1716), "MBTI Lab", font=load_font(24), fill=(255, 255, 255, 120))

    return out.convert("RGB")


def extract_pairs(data_path: Path):
    text = data_path.read_text(encoding="utf-8")
    return dict(re.findall(r'id:\s*"([a-z0-9_]+)"\s*,\s*\n\s*name:\s*"([^"]+)"', text))


def extract_meta(data_path: Path):
    text = data_path.read_text(encoding="utf-8")
    # dynasty/title near id
    meta = {}
    for m in re.finditer(
        r'id:\s*"([a-z0-9_]+)"\s*,\s*\n\s*name:\s*"([^"]+)"\s*,\s*\n\s*dynasty:\s*"([^"]+)"\s*,\s*\n\s*enneagram:\s*"[^"]*"\s*,\s*\n\s*title:\s*"([^"]+)"',
        text,
    ):
        meta[m.group(1)] = (m.group(2), m.group(3), m.group(4))
    return meta


def process_kind(kind: str, queries: dict[str, str]):
    out = ROOT / "app" / kind / "img"
    raw = out / "_raw"
    out.mkdir(parents=True, exist_ok=True)
    raw.mkdir(parents=True, exist_ok=True)
    data_path = ROOT / "app" / kind / "js" / "data.js"
    meta = extract_meta(data_path)
    names = extract_pairs(data_path)
    brand_cn, brand_en, accent = BRAND[kind]

    ok = 0
    for aid, q in queries.items():
        name = names.get(aid) or (meta.get(aid) or (aid,))[0]
        dynasty = (meta.get(aid) or ("", "", ""))[1]
        title = (meta.get(aid) or ("", "", ""))[2]
        subtitle = " · ".join([x for x in (dynasty, title) if x]) or brand_cn
        poster = out / f"{aid}.jpg"
        raw_path = raw / f"{aid}.jpg"

        if not raw_path.exists() or raw_path.stat().st_size < 2000:
            print("fetch", kind, aid, q)
            try:
                url = search_commons(q)
            except Exception as e:
                print("  search err", e)
                url = None
            if url:
                data = http_bytes(url)
                if data:
                    raw_path.write_bytes(data)
                    print("  raw", len(data))
                else:
                    print("  no bytes")
            else:
                print("  no url")
            time.sleep(0.35)
        else:
            print("have raw", aid)

        if raw_path.exists() and raw_path.stat().st_size > 2000:
            try:
                im = Image.open(io.BytesIO(raw_path.read_bytes()))
                poster_im = compose_poster(im, name, subtitle, brand_cn, brand_en, accent)
                poster_im.save(poster, "JPEG", quality=90, optimize=True)
                ok += 1
                print("  poster", poster.name)
            except Exception as e:
                print("  compose fail", e)
        else:
            print("  skip", aid)
    print(kind, "posters", ok, "/", len(queries))
    return ok


def patch_resolve(kind: str):
    path = ROOT / "app" / kind / "js" / "data.js"
    text = path.read_text(encoding="utf-8")
    # Prefer jpg; keep svg fallback via onerror already in app, but set default to jpg
    text2, n = re.subn(
        r'function resolveImage\(id\) \{\s*return "\./img/" \+ id \+ "\.svg(?:\?v=\d+)?";\s*\}',
        'function resolveImage(id) {\n    return "./img/" + id + ".jpg?v=4";\n  }',
        text,
        count=1,
    )
    if n:
        # history IMAGE_OVERRIDES force svg — neutralize to jpg when jpg exists
        text2 = re.sub(
            r'if \(IMAGE_OVERRIDES\[f\.id\]\) f\.image = IMAGE_OVERRIDES\[f\.id\] \+ "\?v=\d+";',
            'if (IMAGE_OVERRIDES[f.id]) {\n'
            '        // prefer composed jpg posters when present\n'
            '        f.image = "./img/" + f.id + ".jpg?v=4";\n'
            "      }",
            text2,
        )
        path.write_text(text2, encoding="utf-8")
        print("patched resolveImage", kind)
    else:
        print("resolveImage not patched", kind)


def main():
    process_kind("history", HISTORY_QUERIES)
    process_kind("world", WORLD_QUERIES)
    patch_resolve("history")
    patch_resolve("world")


if __name__ == "__main__":
    main()
