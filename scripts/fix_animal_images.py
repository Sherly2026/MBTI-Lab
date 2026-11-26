# -*- coding: utf-8 -*-
import re
from pathlib import Path

p = Path(__file__).resolve().parents[1] / "app" / "animal" / "js" / "data.js"
text = p.read_text(encoding="utf-8")

mapping = {
    "intj-owl": ("owl,bird", 101),
    "intj-panther": ("black,panther", 102),
    "intj-raven": ("raven,crow", 103),
    "intp-octopus": ("octopus", 104),
    "intp-cat": ("cat,tabby", 105),
    "entj-lion": ("lion", 106),
    "entj-eagle": ("eagle,bird", 107),
    "entp-fox": ("fox", 108),
    "entp-magpie": ("magpie,bird", 109),
    "infj-deer": ("deer", 110),
    "infj-snow-leopard": ("snow,leopard", 111),
    "infp-butterfly": ("butterfly", 112),
    "infp-bunny": ("rabbit", 113),
    "enfj-dolphin": ("dolphin", 114),
    "enfj-elephant": ("elephant", 115),
    "enfp-otter": ("otter", 116),
    "enfp-parrot": ("macaw,parrot", 117),
    "istj-beaver": ("beaver", 118),
    "istj-albatross": ("albatross,bird", 119),
    "isfj-penguin": ("penguin", 120),
    "isfj-koala": ("koala", 121),
    "estj-shepherd": ("shepherd,dog", 122),
    "estj-bee": ("bee", 123),
    "esfj-retriever": ("golden,retriever", 124),
    "esfj-sparrow": ("sparrow,bird", 125),
    "istp-lynx": ("lynx", 126),
    "istp-shark": ("shark", 127),
    "isfp-redpanda": ("red,panda", 128),
    "isfp-swan": ("swan", 129),
    "estp-cheetah": ("cheetah", 130),
    "estp-wolf": ("wolf", 131),
    "esfp-peacock": ("peacock", 132),
    "esfp-meerkat": ("meerkat", 133),
}

for aid, (tags, lock) in mapping.items():
    url = f"https://loremflickr.com/1400/1800/{tags}?lock={lock}"
    pattern = rf'(id:\s*"{re.escape(aid)}"[\s\S]*?image:\s*\n\s*")([^"]+)(")'
    text, n = re.subn(pattern, rf"\g<1>{url}\3", text, count=1)
    print(("OK" if n == 1 else "FAIL"), aid, n)

p.write_text(text, encoding="utf-8")
print("done")
