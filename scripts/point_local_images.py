# -*- coding: utf-8 -*-
"""Point data.js animal.image fields to local img assets."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "app" / "animal" / "js" / "data.js"
IMG = ROOT / "app" / "animal" / "img"

text = DATA.read_text(encoding="utf-8")
ids = re.findall(r'id:\s*"(.*?)"', text)
# only animal ids like intj-owl
ids = [i for i in ids if "-" in i and i.split("-")[0].isalpha()]

for aid in sorted(set(ids)):
    jpg = IMG / f"{aid}.jpg"
    svg = IMG / f"{aid}.svg"
    if jpg.exists() and jpg.stat().st_size > 2000:
        rel = f"./img/{aid}.jpg"
    elif svg.exists():
        rel = f"./img/{aid}.svg"
    else:
        print("missing asset", aid)
        continue
    pattern = rf'(id:\s*"{re.escape(aid)}"[\s\S]*?image:\s*\n\s*")([^"]+)(")'
    text, n = re.subn(pattern, rf"\g<1>{rel}\3", text, count=1)
    print(aid, "->" , rel, "n=", n)

DATA.write_text(text, encoding="utf-8")
print("updated", DATA)
