#!/usr/bin/env python3
"""Raccoglie schemi gratuiti all'uncinetto dal web e li salva in data/web.json.

Fonti: feed RSS/Atom elencati in scripts/sources.json e, facoltativamente,
l'API di Ravelry (variabili d'ambiente RAVELRY_USER e RAVELRY_KEY).

Il file viene aggiornato in modo incrementale: gli schemi già presenti restano
nell'archivio (fino a MAX_ITEMS) e quelli nuovi vengono aggiunti in cima.
Per rispetto del diritto d'autore si salvano solo titolo, autore, immagine di
anteprima, un breve estratto e il link alla pagina originale.

Uso:  python scripts/fetch_patterns.py [--out data/web.json]
Dipendenze: nessuna (solo libreria standard di Python 3.9+).
"""
from __future__ import annotations

import argparse
import base64
import concurrent.futures as cf
import email.utils
import hashlib
import html
import json
import os
import re
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MAX_ITEMS = 900
MAX_PER_FEED = 30
MAX_OG_LOOKUPS = 150
EXCERPT_LEN = 240
UA = "Mozilla/5.0 (compatible; GomitoloBot/1.0; +https://github.com/)"

NS = {
    "content": "http://purl.org/rss/1.0/modules/content/",
    "media": "http://search.yahoo.com/mrss/",
    "dc": "http://purl.org/dc/elements/1.1/",
    "atom": "http://www.w3.org/2005/Atom",
}

# ---------------------------------------------------------------- rete

def fetch(url: str, timeout: int = 25, headers: dict | None = None) -> bytes:
    """Scarica un URL. Sostituibile nei test (es. per passare da un proxy)."""
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*", **(headers or {})})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


# ---------------------------------------------------------------- classificazione

def _rx(words: str) -> re.Pattern:
    return re.compile(r"\b(" + words + r")\b", re.I)

CATEGORY_RULES = [
    ("tecniche", re.compile(r"^(?!.*\b(blanket|throw|afghan|hat|bag|sweater|scarf|toy|amigurumi|pattern|top|tote|along|cal)\b).*\b(tutorials?|how to|stitch(es)?|stitchopedia|guide|learn(ing)?|techniques?|tips|basics|lessons?|join(ing)?|felting|blocking|charts?|magic ring|tension)\b", re.I)),
    ("amigurumi", _rx(r"amigurumi|ami|plush(ie)?s?|stuffed|stuffie|softies?|toys?|dolls?|teddy|bears?|bunn(y|ies)|rabbits?|octopus|dino(saur)?s?|unicorns?|elephants?|whales?|owls?|kitty|kittens?|puppy|puppies|frogs?|turtles?|ducks?|chicks?|foxe?s?|mouse|mice|lamb|sheep|penguins?|dragons?|monkeys?|lions?|giraffes?|axolotl|snails?|bees?|jellyfish|cactus|lovey|loveys|gnomes?|snowman")),
    ("accessori", _rx(r"bags?|totes?|purses?|pouch(es)?|clutch|backpacks?|wallets?|keychains?|key ?rings?|bookmarks?|earrings?|jewel(le)?ry|necklaces?|bracelets?|scrunchies?|headbands?|ear ?warmers?|bandanas?|hair ?(clips?|bows?)|bows?|(mug|cup|phone|tea|bottle|jar) ?(cozy|cozies|cosy|cosies|sleeves?|cases?)|lanyards?|market bag|bucket hat|totebag")),
    ("abbigliamento", _rx(r"sweaters?|cardigans?|tops?|tees?|t-shirts?|shirts?|dress(es)?(?! up)|skirts?|vests?|pullovers?|ponchos?|shawls?|scarf|scarves|cowls?|hats?|beanies?|berets?|mittens?|gloves?|socks?|slippers?|kimonos?|jackets?|coats?|hoodies?|bralettes?|shrugs?|wraps?|tank|jumpers?|booties|bonnets?|balaclava|leg ?warmers?|sweatshirts?|halter|blouses?|tunics?|wearable")),
    ("casa", _rx(r"blankets?|afghans?|throws?|pillows?|cushions?|rugs?|mats?|baskets?|coasters?|potholders?|pot holders?|dish ?cloths?|wash ?cloths?|placemats?|towels?|table ?runners?|bins?|storage|plant ?hangers?|planters?|curtains?|ottomans?|poufs?|quilts?|bedspreads?|scrubb(y|ies)|trivets?|kitchen|home|squares?|granny")),
    ("decorazioni", _rx(r"christmas|xmas|ornaments?|garlands?|wreaths?|halloween|easter|valentines?|thanksgiving|flowers?|roses?|bunting|wall ?hangings?|mandalas?|trees?|pumpkins?|hearts?|snowflakes?|appliques?|decor(ation)?s?|stockings?|bouquets?|leaves|leaf|stars?|garden|spring|autumn|fall|holiday|ghosts?|bats?|witch(es)?|skulls?|spiders?|candy|gingerbread|angels?|eggs?|suncatchers?|dreamcatchers?")),
]

LEVEL_RULES = [
    (3, _rx(r"advanced|expert|complex|challenging")),
    (2, _rx(r"intermediate|easy[- ]intermediate")),
    (1, _rx(r"beginners?|easy|simple|quick|basic|first[- ]time|1 hour|one hour|fast|no[- ]sew")),
]

TAG_RULES = [
    ("granny", _rx(r"granny")), ("c2c", _rx(r"c2c|corner to corner")), ("tunisian", _rx(r"tunisian")),
    ("mosaico", _rx(r"mosaic")), ("tapestry", _rx(r"tapestry|colorwork|colourwork")), ("no-sew", _rx(r"no[- ]sew")),
    ("bambini", _rx(r"baby|babies|kids?|children|toddler|newborn")), ("natale", _rx(r"christmas|xmas")),
    ("halloween", _rx(r"halloween")), ("pasqua", _rx(r"easter")), ("estate", _rx(r"summer|beach")),
    ("inverno", _rx(r"winter|cozy|cosy")), ("veloce", _rx(r"quick|fast|1 hour|one hour|weekend")),
    ("scarti", _rx(r"scrap|stash ?buster|leftover")), ("video", _rx(r"video|youtube")),
    ("raccolta", re.compile(r"^\s*\d+\+?\s|\bround-?up\b|\bideas\b|\bcollection\b", re.I)),
]

EXCLUDE = _rx(r"giveaway|winners?|sale|coupon|discount|black friday|cyber monday|review|podcast|interview|announcement|gift guide|sponsored|affiliate|what i('m| am) (making|working)|blog ?hop|cal recap|link ?party|newsletter|catch up|yarns? to try|new .*yarns?|yarn colou?rs|amazon|books?|is back|updates?|sneak peek|shop|kits?|dollar tree|haul|influencers?|named in|awards?")
CROCHET = re.compile(r"crochet|amigurumi|granny", re.I)
KNIT = re.compile(r"\bknit(ted|ting)?\b", re.I)


def classify(text: str, forced: str | None = None, fallback: str = "") -> tuple[str, int, list[str]]:
    """Categoria dal titolo; le categorie del blog (spesso generiche) servono solo come ripiego."""
    cat = forced
    for t in (text, fallback):
        if not cat and t:
            cat = next((c for c, rx in CATEGORY_RULES if rx.search(t)), None)
    level = next((lv for lv, rx in LEVEL_RULES if rx.search(text)), 0)
    tags = [t for t, rx in TAG_RULES if rx.search(f"{text} {fallback}")]
    return cat or "casa", level, tags


# ---------------------------------------------------------------- utilità testo

TAG_RE = re.compile(r"<[^>]+>")
WS_RE = re.compile(r"\s+")
BAD_ENTITY = re.compile(r"&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)")
CTRL = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f]")


def strip_html(s: str) -> str:
    s = re.sub(r"(?is)<(script|style|figure|figcaption).*?</\1>", " ", s or "")
    s = html.unescape(TAG_RE.sub(" ", s))
    s = re.sub(r"(?i)the post .{0,200}? appeared first on .*$", "", s)
    s = re.sub(r"(?i)(continue reading|read more|\[\.\.\.\]|\[…\]).*$", "", s)
    return WS_RE.sub(" ", s).strip()


def clip(s: str, n: int = EXCERPT_LEN) -> str:
    if len(s) <= n:
        return s
    cut = s[:n].rsplit(" ", 1)[0].rstrip(",.;:–- ")
    return cut + "…"


def clean_title(s: str) -> str:
    return WS_RE.sub(" ", html.unescape(TAG_RE.sub("", s or ""))).strip()


def norm_link(u: str) -> str:
    p = urllib.parse.urlsplit(u.strip())
    q = [(k, v) for k, v in urllib.parse.parse_qsl(p.query) if not k.lower().startswith(("utm_", "fbclid", "ref"))]
    return urllib.parse.urlunsplit((p.scheme or "https", p.netloc.lower(), p.path, urllib.parse.urlencode(q), ""))


def item_id(link: str) -> str:
    return "w" + hashlib.sha1(norm_link(link).encode()).hexdigest()[:10]


def parse_date(s: str | None) -> str | None:
    if not s:
        return None
    s = s.strip()
    try:
        d = email.utils.parsedate_to_datetime(s)
    except (TypeError, ValueError):
        try:
            d = datetime.fromisoformat(s.replace("Z", "+00:00"))
        except ValueError:
            return None
    if d.tzinfo is None:
        d = d.replace(tzinfo=timezone.utc)
    return d.astimezone(timezone.utc).isoformat(timespec="seconds")


IMG_SRC = re.compile(r"""<img\b[^>]*?\b(?:data-lazy-src|data-src|src)\s*=\s*["']([^"']+)["']""", re.I)
OG_IMG = [
    re.compile(r"""<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image)["'][^>]*content=["']([^"']+)""", re.I),
    re.compile(r"""<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name)=["'](?:og:image|twitter:image)["']""", re.I),
]
BAD_IMG = re.compile(r"gravatar|feedburner|s\.w\.org|emoji|pixel|1x1|spacer|blank\.|avatar|logo|badge|pinterest|button|icon|data:image|\.svg", re.I)


def good_img(u: str | None, base: str) -> str | None:
    if not u:
        return None
    u = html.unescape(u.strip())
    if BAD_IMG.search(u):
        return None
    u = urllib.parse.urljoin(base, u)
    return u if u.startswith("http") else None


# ---------------------------------------------------------------- feed RSS/Atom

def _text(el, path: str) -> str:
    x = el.find(path, NS)
    return (x.text or "").strip() if x is not None and x.text else ""


def parse_feed(raw: bytes, src: dict) -> list[dict]:
    txt = raw.decode("utf-8", "replace").lstrip("\ufeff \r\n\t")
    txt = BAD_ENTITY.sub("&amp;", CTRL.sub("", txt))
    root = ET.fromstring(txt.encode("utf-8"))
    out = []
    entries = root.findall("./channel/item") or root.findall("atom:entry", NS)
    for it in entries[:MAX_PER_FEED]:
        atom = it.tag.endswith("entry")
        title = clean_title(_text(it, "atom:title" if atom else "title"))
        if atom:
            link_el = next((l for l in it.findall("atom:link", NS) if l.get("rel", "alternate") == "alternate"), None)
            link = link_el.get("href", "") if link_el is not None else ""
            date = parse_date(_text(it, "atom:published") or _text(it, "atom:updated"))
            author = _text(it, "atom:author/atom:name")
            body = _text(it, "atom:content") or _text(it, "atom:summary")
            summary = _text(it, "atom:summary") or body
            cats = [c.get("term", "") for c in it.findall("atom:category", NS)]
        else:
            link = _text(it, "link")
            date = parse_date(_text(it, "pubDate") or _text(it, "dc:date"))
            author = _text(it, "dc:creator") or _text(it, "author")
            body = _text(it, "content:encoded") or _text(it, "description")
            summary = _text(it, "description") or body
            cats = [(c.text or "") for c in it.findall("category")]
        if not title or not link.startswith("http"):
            continue
        hay = " ".join([title, " ".join(cats)])
        if EXCLUDE.search(title):
            continue
        if not src.get("crochetOnly") and not CROCHET.search(hay):
            continue
        if KNIT.search(title) and not CROCHET.search(title):
            continue

        img = None
        for m in it.findall("media:content", NS) + it.findall("media:thumbnail", NS) + it.findall("enclosure"):
            if m.get("medium") == "image" or (m.get("type") or "").startswith("image") or re.search(r"\.(jpe?g|png|webp)(\?|$)", m.get("url", ""), re.I):
                img = good_img(m.get("url"), link)
                if img:
                    break
        if not img:
            for u in IMG_SRC.findall(body):
                img = good_img(u, link)
                if img:
                    break

        cat, level, tags = classify(title, src.get("cat"), " ".join(cats))
        if level == 0:
            m = re.search(r"\b(beginner|intermediate|advanced|experienced)\b", strip_html(summary)[:800], re.I)
            level = {"beginner": 1, "intermediate": 2}.get(m.group(1).lower(), 3) if m else 0
        out.append({
            "id": item_id(link), "title": title, "link": norm_link(link), "img": img,
            "src": src["name"], "site": "{0.scheme}://{0.netloc}".format(urllib.parse.urlsplit(link)),
            "author": clean_title(author)[:60] or None, "date": date,
            "cat": cat, "level": level, "tags": tags, "excerpt": clip(strip_html(summary)), "lang": "en",
        })
    return out


def from_feed(src: dict) -> tuple[dict, list[dict], str | None]:
    try:
        return src, parse_feed(fetch(src["url"]), src), None
    except Exception as e:  # noqa: BLE001 - una fonte rotta non deve fermare le altre
        return src, [], f"{type(e).__name__}: {e}"[:160]


# ---------------------------------------------------------------- Ravelry (opzionale)

def from_ravelry(cfg: dict) -> tuple[list[dict], str | None]:
    user, key = os.environ.get("RAVELRY_USER"), os.environ.get("RAVELRY_KEY")
    if not (user and key):
        return [], "credenziali assenti (RAVELRY_USER/RAVELRY_KEY): salto"
    auth = {"Authorization": "Basic " + base64.b64encode(f"{user}:{key}".encode()).decode()}
    out, err = [], None
    for q in cfg.get("queries", []):
        try:
            data = json.loads(fetch(f"https://api.ravelry.com/patterns/search.json?{q}&page_size=40", headers=auth))
        except Exception as e:  # noqa: BLE001
            err = f"{type(e).__name__}: {e}"[:160]
            continue
        for p in data.get("patterns", []):
            link = f"https://www.ravelry.com/patterns/library/{p.get('permalink')}"
            photo = p.get("first_photo") or {}
            designer = (p.get("designer") or {}).get("name")
            title = clean_title(p.get("name", ""))
            if not title:
                continue
            cat, level, tags = classify(title)
            out.append({
                "id": item_id(link), "title": title, "link": link,
                "img": photo.get("medium2_url") or photo.get("medium_url") or photo.get("small_url"),
                "src": "Ravelry", "site": "https://www.ravelry.com", "author": designer, "date": None,
                "cat": cat, "level": level, "tags": tags,
                "excerpt": f"Schema gratuito di {designer} su Ravelry." if designer else "Schema gratuito su Ravelry.", "lang": "en",
            })
    return out, err


# ---------------------------------------------------------------- og:image

def og_image(url: str) -> str | None:
    try:
        page = fetch(url, timeout=30).decode("utf-8", "replace")[:1_500_000]
    except Exception:  # noqa: BLE001
        return None
    for rx in OG_IMG:
        m = rx.search(page)
        if m:
            return good_img(m.group(1), url)
    return None


# ---------------------------------------------------------------- main

def run(out_path: Path) -> int:
    cfg = json.loads((ROOT / "scripts" / "sources.json").read_text(encoding="utf-8"))
    old = {}
    if out_path.exists():
        try:
            old = {i["id"]: i for i in json.loads(out_path.read_text(encoding="utf-8")).get("items", [])}
        except (ValueError, KeyError):
            old = {}

    now = datetime.now(timezone.utc).isoformat(timespec="seconds")
    fresh: list[dict] = []
    report = []
    with cf.ThreadPoolExecutor(max_workers=8) as ex:
        for src, items, err in ex.map(from_feed, cfg.get("feeds", [])):
            fresh += items
            report.append({"name": src["name"], "url": src["url"], "count": len(items), **({"error": err} if err else {})})
    rav, rerr = from_ravelry(cfg.get("ravelry", {}))
    fresh += rav
    report.append({"name": "Ravelry", "url": "https://www.ravelry.com", "count": len(rav), **({"error": rerr} if rerr else {})})

    merged = dict(old)
    new_count = 0
    for it in fresh:
        prev = merged.get(it["id"])
        it["seen"] = prev.get("seen", now) if prev else now
        if prev and not it.get("img"):
            it["img"] = prev.get("img")
        if not prev:
            new_count += 1
        merged[it["id"]] = it

    missing = [i for i in merged.values() if not i.get("img")][:MAX_OG_LOOKUPS]
    with cf.ThreadPoolExecutor(max_workers=8) as ex:
        for it, img in zip(missing, ex.map(lambda i: og_image(i["link"]), missing)):
            it["img"] = img

    items = sorted(merged.values(), key=lambda i: i.get("date") or i["seen"], reverse=True)[:MAX_ITEMS]
    data = {"updated": now, "count": len(items), "sources": report, "items": items}
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")

    for r in report:
        print(f"  {'✗' if r.get('error') else '✓'} {r['name']:<32} {r['count']:>3}  {r.get('error', '')}")
    print(f"{len(items)} schemi in archivio, {new_count} nuovi → {out_path}")
    return 0 if items else 1


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--out", default=str(ROOT / "data" / "web.json"))
    args = ap.parse_args()
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    sys.exit(run(Path(args.out).resolve()))
