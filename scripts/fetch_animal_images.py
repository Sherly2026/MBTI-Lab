# -*- coding: utf-8 -*-
"""Download animal photos from Wikimedia Commons into app/animal/img/."""
from __future__ import annotations

import re
import ssl
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "app" / "animal" / "img"
DATA = ROOT / "app" / "animal" / "js" / "data.js"

# Commons FilePath titles (verified / commonly available)
FILES = {
    "intj-owl": "Barn_owl_at_British_Wildlife_Centre.jpg",
    "intj-panther": "Black_leopard_1.jpg",
    "intj-raven": "Common_Raven_at_Yosemite_NP.jpg",
    "intp-octopus": "Octopus_vulgaris_2.jpg",
    "intp-cat": "Cat_poster_1.jpg",
    "entj-lion": "Lion_waiting_in_Namibia.jpg",
    "entj-eagle": "GoldenEagle-Nova.jpg",
    "entp-fox": "Vulpes_vulpes_sitting.jpg",
    "entp-magpie": "Pica_pica_-British_Wildlife_Centre-8a.jpg",
    "infj-deer": "White-tailed_deer.jpg",
    "infj-snow-leopard": "Uncia_uncia.jpg",
    "infp-butterfly": "Papilio_machaon_cf2.jpg",
    "infp-bunny": "Wild_rabbit_in_england.jpg",
    "enfj-dolphin": "Tursiops_truncatus_01.jpg",
    "enfj-elephant": "African_Bush_Elephant.jpg",
    "enfp-otter": "Otter_in_Southwold.jpg",
    "enfp-parrot": "Ara_ararauna_Luc_Viatour.jpg",
    "istj-beaver": "American_Beaver.jpg",
    "istj-albatross": "Diomedea_exulans_in_flight_-_SE_Tasmania.jpg",
    "isfj-penguin": "Aptenodytes_forsteri_-Snow_Hill_Island,_Antarctica_-adults_and_juvenile-8.jpg",
    "isfj-koala": "Koala_climbing_tree.jpg",
    "estj-shepherd": "German_Shepherd_Dog_-_fullbody.jpg",
    "estj-bee": "Honey_bee_on_a_thistle.jpg",
    "esfj-retriever": "Golden_Retriever_sitting.jpg",
    "esfj-sparrow": "Passer_domesticus_male_(15).jpg",
    "istp-lynx": "Lynx_lynx-4.JPG",
    "istp-shark": "Carcharhinus_amblyrhynchos_1.jpg",
    "isfp-redpanda": "RedPandaFullBody.jpg",
    "isfp-swan": "Mute_swan_Trumpeter_swan_comparison.jpg",
    "estp-cheetah": "Cheetah_(Acinonyx_jubatus)_female_with_cubs.jpg",
    "estp-wolf": "Canis_lupus_laying.jpg",
    "esfp-peacock": "Pavo_cristatus_-Kuala_Lumpur_Bird_Park-8a.jpg",
    "esfp-meerkat": "Suricata_suricatta_Linnaeus.jpg",
}

# Fallbacks if primary title 404s
FALLBACKS = {
    "intj-owl": "Tyto_alba_close_up.jpg",
    "intj-panther": "Panthera_pardus_kotiya.jpg",
    "intj-raven": "Corvus_corax_(Common_Raven)_-_Central_Park.jpg",
    "intp-octopus": "Octopus2.jpg",
    "entj-eagle": "Aquila_chrysaetos_Flickr.jpg",
    "entp-magpie": "Pica_pica_magpie.jpg",
    "infj-snow-leopard": "Snow_leopard_in_Zoo.jpg",
    "infp-bunny": "Oryctolagus_cuniculus_Tasmania_2.jpg",
    "enfp-otter": "Lutra_lutra_Linnaeus.jpg",
    "istj-beaver": "Castor_canadensis.jpg",
    "istj-albatross": "Wandering_albatross_chick.jpg",
    "isfj-penguin": "EmperorPenguins.jpg",
    "estj-shepherd": "Deutscher_Schaeferhund_R%C3%BCde.jpg",
    "esfj-sparrow": "House_Sparrow_(Passer_domesticus)_-_male.jpg",
    "istp-lynx": "Lynx-canadensis.jpg",
    "isfp-swan": "Cygnus_olor_2.jpg",
    "estp-wolf": "Canis_lupus_pack_surrounding_bison.jpg",
    "esfp-peacock": "Peacock_Pleades.jpg",
    "esfp-meerkat": "Meerkat_(Suricata_suricatta).jpg",
}

UA = "MBTI-Lab/1.0 (educational; local asset fetch)"
CTX = ssl.create_default_context()


def fetch(title: str) -> bytes | None:
    # Prefer Special:FilePath redirect
    url = "https://commons.wikimedia.org/wiki/Special:FilePath/" + urllib.parse.quote(
        title.replace("%C3%BC", "ü"), safe=""
    )
    # width param via thumb - Special:FilePath supports width
    url = url + "?width=1400"
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=45, context=CTX) as resp:
            data = resp.read()
            if len(data) < 2000:
                return None
            return data
    except Exception as e:
        print("  fail", title, e)
        return None


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    ok = 0
    for aid, title in FILES.items():
        dest = OUT / f"{aid}.jpg"
        print("fetch", aid, title)
        data = fetch(title)
        if data is None and aid in FALLBACKS:
            print("  fallback", FALLBACKS[aid])
            data = fetch(FALLBACKS[aid])
        if data is None:
            print("  SKIP", aid)
            continue
        dest.write_bytes(data)
        print("  saved", dest.name, len(data))
        ok += 1

    # Rewrite data.js image fields to local paths
    text = DATA.read_text(encoding="utf-8")
    for aid in FILES:
        local = f"./img/{aid}.jpg"
        pattern = rf'(id:\s*"{re.escape(aid)}"[\s\S]*?image:\s*\n\s*")([^"]+)(")'
        text, n = re.subn(pattern, rf"\g<1>{local}\3", text, count=1)
        print("rewrite", aid, n)
    DATA.write_text(text, encoding="utf-8")
    print(f"done: {ok}/{len(FILES)} images")


if __name__ == "__main__":
    main()
