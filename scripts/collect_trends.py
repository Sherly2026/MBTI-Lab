import json
import sys
import urllib.request

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/124.0 Safari/537.36",
    "Referer": "https://weibo.com/",
}


def fetch_json(url, headers=None):
    req = urllib.request.Request(url, headers=headers or HEADERS)
    with urllib.request.urlopen(req, timeout=15) as resp:
        return json.loads(resp.read().decode("utf-8"))


def weibo_hot(limit):
    data = fetch_json("https://weibo.com/ajax/side/hotSearch")
    items = data.get("data", {}).get("realtime", [])[:limit]
    return [
        {"source": "微博", "title": i.get("word", ""), "hot": i.get("num", 0)}
        for i in items
    ]


def bilibili_hot(limit):
    data = fetch_json(
        "https://api.bilibili.com/x/web-interface/ranking/v2?rid=0&type=all",
        headers={**HEADERS, "Referer": "https://www.bilibili.com/"},
    )
    items = data.get("data", {}).get("list", [])[:limit]
    return [
        {"source": "B站", "title": i.get("title", ""), "hot": i.get("stat", {}).get("view", 0)}
        for i in items
    ]


def zhihu_hot(limit):
    data = fetch_json(
        "https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50",
        headers={**HEADERS, "Referer": "https://www.zhihu.com/"},
    )
    items = data.get("data", [])[:limit]
    return [
        {
            "source": "知乎",
            "title": i.get("target", {}).get("title", ""),
            "hot": i.get("detail_text", ""),
        }
        for i in items
    ]


def main():
    limit = 20
    if "--limit" in sys.argv:
        idx = sys.argv.index("--limit")
        if idx + 1 < len(sys.argv):
            limit = int(sys.argv[idx + 1])

    results = []
    for name, fn in [("微博", weibo_hot), ("B站", bilibili_hot), ("知乎", zhihu_hot)]:
        try:
            results.extend(fn(limit))
        except Exception as e:
            results.append({"source": name, "error": str(e)})

    print(json.dumps(results, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
