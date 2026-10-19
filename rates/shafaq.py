"""Shafaq News (Arabic economy section) reader for the daily rates board.
python3 shafaq.py            -> list today's dollar/gold articles (Baghdad time) with body text
python3 shafaq.py URL        -> print one article's date and body"""
import re, sys, html, json, urllib.request, urllib.parse, datetime as dt

BASE = 'https://shafaq.com'
SEC = BASE + '/ar/' + urllib.parse.quote('اقتصـاد')
UA = {'User-Agent': 'Mozilla/5.0 (dinarchi rates board)'}


def get(u):
    return urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=30).read().decode('utf-8', 'replace')


def article(u):
    s = get(u)
    d = (re.findall(r'"datePublished":"([^"]+)"', s) or [''])[0]
    t = html.unescape(re.sub(r'<script.*?</script>|<style.*?</style>', '', s, flags=re.S))
    t = re.sub(r'<[^>]+>', '\n', t)
    lines = [l.strip() for l in t.split('\n')]
    body = [l for l in lines if len(l) > 50 and re.search(r'\d{3}', l) and any(k in l for k in ('دينار', 'عيار', 'دولار'))]
    return d, '\n'.join(dict.fromkeys(body))


def listing():
    s = get(SEC)
    out = []
    for m in re.finditer(r'href="(/ar/[^"]+)"[^>]*>(?:\s*<[^>]+>)*\s*([^<]{8,160})<', s):
        t = html.unescape(m.group(2)).strip()
        if re.search(r'(الدولار|الصرف|الذهب|المثقال)', t) and re.search(r'(بغداد|أربيل|العراق)', t):
            out.append((t, BASE + urllib.parse.quote(urllib.parse.unquote(m.group(1)))))
    return list(dict.fromkeys(out))


if __name__ == '__main__':
    if len(sys.argv) > 1:
        d, b = article(sys.argv[1]); print(d); print(b); sys.exit()
    for t, u in listing():
        d, b = article(u)
        print(json.dumps({'title': t, 'url': u, 'published': d, 'body': b}, ensure_ascii=False, indent=1))
