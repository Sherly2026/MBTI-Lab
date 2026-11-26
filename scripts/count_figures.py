# -*- coding: utf-8 -*-
import re
from pathlib import Path

t = Path("app/history/js/data.js").read_text(encoding="utf-8")
for code in [
    "INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP",
    "ISTJ", "ISFJ", "ESTJ", "ESFJ", "ISTP", "ISFP", "ESTP", "ESFP",
]:
    m = re.search(rf"{code}:\s*\[([\s\S]*?)\n    \],", t)
    if not m:
        print(code, "MISSING")
        continue
    n = len(re.findall(r'id:\s*"', m.group(1)))
    print(code, n)
