"""Daily rates board for @dinarchi.iq: one 1080x1350 post (and a 1080x1920 story) from data/<date>.json.
python3 build.py data/2026-10-19.json   -> daily/<date>/board.html, story.html, caption.txt  (then: node render.js daily/<date>)
Rules: near-white paper, Noto Kufi Arabic, English digits (rate-board style), giant dollar number,
Erbil (KRI) beside Baghdad, gold drawn as bars, source line on the post."""
import json, sys, os, base64, datetime as dt

HERE = os.path.dirname(os.path.abspath(__file__))
PAPER, INK, MUTED, LINE, PANEL = '#fcfbf8', '#15181c', '#6b6f76', '#e7e3da', '#ffffff'
AC, AC_D = '#0f7a5c', '#0b5c45'          # markets emerald (topic-colour-system)
UP, DOWN = '#c2410c', '#0f7a5c'           # dollar up = dinar weaker (orange), down = green
G1, G2, G3 = '#f6d77a', '#d9a531', '#9c6b12'

MONTHS = ['کانوونی دووەم', 'شوبات', 'ئازار', 'نیسان', 'ئایار', 'حوزەیران', 'تەممووز', 'ئاب', 'ئەیلوول',
          'تشرینی یەکەم', 'تشرینی دووەم', 'کانوونی یەکەم']
DAYS = ['دووشەممە', 'سێشەممە', 'چوارشەممە', 'پێنجشەممە', 'هەینی', 'شەممە', 'یەکشەممە']
MITHQAL_G, OZ_G = 5.0, 31.1035


def f(n):
    return f'{int(round(n)):,}'


def rnd(x, step):
    return int(round(x / step) * step)


def flag(code, r=34):
    d = 2 * r
    clip = f'<clipPath id="c{code}"><circle cx="{r}" cy="{r}" r="{r}"/></clipPath>'
    g = {
        'USD': ''.join(f'<rect y="{i * d / 7}" width="{d}" height="{d / 14}" fill="#b22234"/>' for i in range(7))
               + f'<rect width="{d * .5}" height="{d * .54}" fill="#3c3b6e"/>'
               + ''.join(f'<circle cx="{6 + (j % 4) * 8 + (i % 2) * 4}" cy="{6 + i * 7}" r="1.6" fill="#fff"/>' for i in range(5) for j in range(4)),
        'EUR': f'<rect width="{d}" height="{d}" fill="#003399"/>' + ''.join(
            f'<circle cx="{r + r * .55 * __import__("math").cos(a * 0.5236)}" cy="{r + r * .55 * __import__("math").sin(a * 0.5236)}" r="2.6" fill="#ffcc00"/>' for a in range(12)),
        'GBP': f'<rect width="{d}" height="{d}" fill="#012169"/>'
               f'<path d="M0 0L{d} {d}M{d} 0L0 {d}" stroke="#fff" stroke-width="{d * .2}"/>'
               f'<path d="M0 0L{d} {d}M{d} 0L0 {d}" stroke="#c8102e" stroke-width="{d * .07}"/>'
               f'<path d="M{r} 0V{d}M0 {r}H{d}" stroke="#fff" stroke-width="{d * .3}"/>'
               f'<path d="M{r} 0V{d}M0 {r}H{d}" stroke="#c8102e" stroke-width="{d * .17}"/>',
        'TRY': f'<rect width="{d}" height="{d}" fill="#e30a17"/><circle cx="{r * .85}" cy="{r}" r="{r * .5}" fill="#fff"/>'
               f'<circle cx="{r * .97}" cy="{r}" r="{r * .4}" fill="#e30a17"/>'
               f'<polygon transform="translate({r * 1.42} {r}) rotate(-18)" points="0,-9 2.1,-2.9 8.6,-2.8 3.4,1.1 5.3,7.3 0,3.6 -5.3,7.3 -3.4,1.1 -8.6,-2.8 -2.1,-2.9" fill="#fff"/>',
        'JPY': f'<rect width="{d}" height="{d}" fill="#fff"/><circle cx="{r}" cy="{r}" r="{r * .45}" fill="#bc002d"/>',
    }[code]
    return (f'<svg width="{d}" height="{d}" viewBox="0 0 {d} {d}"><defs>{clip}</defs><g clip-path="url(#c{code})">{g}</g>'
            f'<circle cx="{r}" cy="{r}" r="{r - .75}" fill="none" stroke="rgba(0,0,0,.12)" stroke-width="1.5"/></svg>')


def bar(k, w=200):
    """a gold ingot seen from the front-top; deeper colour for higher karat"""
    tone = {24: (G1, G2, G3), 21: ('#f3d98f', '#d4a443', '#a3761f'), 18: ('#f1e0b0', '#cfac62', '#a07f3a')}[k]
    h = w * .46
    return f'''<svg width="{w}" height="{w * 124 / 230:.0f}" viewBox="0 0 230 124">
<defs><linearGradient id="t{k}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff7d6"/><stop offset=".55" stop-color="{tone[0]}"/><stop offset="1" stop-color="{tone[1]}"/></linearGradient>
<linearGradient id="f{k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{tone[1]}"/><stop offset="1" stop-color="{tone[2]}"/></linearGradient></defs>
<ellipse cx="115" cy="114" rx="104" ry="9" fill="rgba(60,40,0,.13)"/>
<polygon points="10,104 220,104 196,60 34,60" fill="url(#f{k})"/>
<polygon points="34,60 196,60 176,22 54,22" fill="url(#t{k})"/>
<polygon points="10,104 34,60 54,22 40,30 22,64" fill="{tone[2]}" opacity=".35"/>
<path d="M60 30 L120 30" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".75"/>
</svg>'''


def compute(d):
    usd = d['usd']
    e = usd['erbil']['sell'] / 100          # dinars per dollar, Erbil shops (the board's base rate)
    fx = d['fx_per_usd']
    cur = [
        ('EUR', 'یۆرۆ', '100 یۆرۆ', rnd(100 / fx['EUR'] * e, 50)),
        ('GBP', 'پاوەند', '100 پاوەندی بەریتانی', rnd(100 / fx['GBP'] * e, 50)),
        ('TRY', 'لیرە', '100 لیرەی تورکی', rnd(100 / fx['TRY'] * e, 10)),
        ('JPY', 'یەن', '1,000 یەنی ژاپۆنی', rnd(1000 / fx['JPY'] * e, 10)),
    ]
    g24 = d['xau_usd'] / OZ_G * MITHQAL_G
    gold = [(k, g24 * k / 24) for k in (24, 21, 18)]
    gold = [(k, round(u), rnd(u * e, 1000)) for k, u in gold]
    return e, cur, gold


def chg(now, prev):
    if not prev:
        return ''
    dlt = now - prev
    if dlt == 0:
        return f'<span class="ch" style="color:{MUTED}">● بێ گۆڕانکاری</span>'
    c, a = (UP, '▲') if dlt > 0 else (DOWN, '▼')
    return f'<span class="ch" style="color:{c}"><b>{a} {f(abs(dlt))}</b> لە چاو دوێنێ</span>'


def date_ku(iso):
    x = dt.date.fromisoformat(iso)
    return f'{DAYS[x.weekday()]} {x.day}ی {MONTHS[x.month - 1]}ی {x.year}'


CSS = f"""
*{{margin:0;padding:0;box-sizing:border-box}}
body{{background:#bbb;font-family:'Noto Kufi Arabic'}}
section{{position:relative;width:1080px;overflow:hidden;background:{PAPER};color:{INK};direction:rtl;margin:0 0 20px}}
.grain{{position:absolute;inset:0;pointer-events:none;opacity:.06;mix-blend-mode:multiply}}
.num{{font-feature-settings:'lnum';direction:ltr;unicode-bidi:isolate;display:inline-block}}
.top{{position:absolute;right:64px;left:64px;display:flex;justify-content:space-between;align-items:flex-start}}
.top h1{{font-size:58px;font-weight:900;line-height:1.3}}
.top h1 em{{font-style:normal;color:{AC}}}
.top .dt{{font-size:30px;font-weight:600;color:{MUTED};margin-top:0}}
.live{{display:flex;align-items:center;gap:12px;background:{INK};color:#fff;border-radius:40px;padding:10px 26px;font-size:28px;font-weight:800;margin-top:14px;white-space:nowrap}}
.live i{{width:14px;height:14px;border-radius:50%;background:#34d399;box-shadow:0 0 0 6px rgba(52,211,153,.25)}}
.hero{{position:absolute;right:64px;left:64px;background:{PANEL};border:2px solid {LINE};border-radius:40px;box-shadow:0 18px 40px -28px rgba(20,30,40,.35)}}
.hero .hd{{display:flex;align-items:center;gap:16px;padding:24px 40px 0;font-size:34px;font-weight:800}}
.hero .hd small{{font-size:28px;color:{MUTED};font-weight:600}}
.cols{{display:flex}}
.col{{flex:1;padding:4px 40px 22px}}
.col+.col{{border-right:2px dashed {LINE}}}
.col .city{{font-size:32px;font-weight:800;color:{AC_D};display:flex;align-items:center;gap:12px}}
.col .city .tag{{font-size:22px;font-weight:700;color:{MUTED};border:2px solid {LINE};border-radius:20px;padding:0 14px}}
.col .big{{font-size:100px;font-weight:900;line-height:1.1;letter-spacing:-2px}}
.col .sub{{font-size:28px;color:{MUTED};font-weight:600;display:flex;gap:22px;flex-wrap:wrap}}
.col .sub b{{color:{INK};font-weight:800}}
.ch{{font-size:26px;font-weight:600;display:block;margin-top:6px}}
.ch b{{font-weight:900}}
.grid{{position:absolute;right:64px;left:64px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}}
.cc{{background:{PANEL};border:2px solid {LINE};border-radius:28px;padding:16px 24px;display:flex;align-items:center;gap:16px;height:112px}}
.cc .t{{flex:1;min-width:0}}
.cc .n{{font-size:34px;font-weight:800;line-height:1.3;white-space:nowrap}}
.cc .u{{font-size:22px;color:{MUTED};font-weight:600;white-space:nowrap}}
.cc .v{{font-size:48px;font-weight:900;line-height:1.2;white-space:nowrap;text-align:left}}
.cc .v small{{display:block;font-size:22px;color:{MUTED};font-weight:700;line-height:1;text-align:left}}
.gold{{position:absolute;right:64px;left:64px}}
.gold .gh{{display:flex;justify-content:space-between;align-items:baseline}}
.gold .gh b{{font-size:40px;font-weight:900}}
.gold .gh span{{font-size:26px;color:{MUTED};font-weight:600}}
.bars{{display:flex;justify-content:space-between;margin-top:6px}}
.gb{{width:300px;text-align:center;display:flex;flex-direction:column;align-items:center}}
.gb .k{{font-size:30px;font-weight:800;color:#8a5a00;line-height:1.4}}
.gb .iq{{font-size:48px;font-weight:900;line-height:1.2;white-space:nowrap}}
.gb .us{{font-size:28px;font-weight:700;color:{MUTED};line-height:1.4;display:flex;gap:14px;align-items:center}}
.gb .usd{{background:#f6ecd2;color:#7a4f00;border-radius:22px;padding:0 16px;font-weight:800}}
.ft{{position:absolute;right:64px;left:64px;display:flex;justify-content:space-between;align-items:center;gap:30px;border-top:2px solid {LINE};padding-top:18px}}
.ft .s{{font-size:20px;color:{MUTED};font-weight:500;line-height:1.55}}
.ft .r{{display:flex;flex-direction:column;align-items:center;gap:2px}}
.ft .r img{{height:54px}}
.ft .r span{{font-size:22px;font-weight:800;direction:ltr}}
"""

FONTS = '<link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;500;600;700;800;900&display=block" rel="stylesheet">'
GRAIN = ('<svg class="grain" viewBox="0 0 1080 1920" preserveAspectRatio="none"><filter id="gn"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" stitchTiles="stitch"/>'
         '<feColorMatrix type="saturate" values="0"/></filter><rect width="1080" height="1920" filter="url(#gn)"/></svg>')


def board(d, H, y):
    """y: dict of block tops so the post and the story share one layout"""
    e, cur, gold = compute(d)
    u, p = d['usd'], d.get('prev') or {}
    logo = 'data:image/png;base64,' + base64.b64encode(open(os.path.join(HERE, 'logo.png'), 'rb').read()).decode()
    num = lambda n: f'<span class="num">{f(n)}</span>'
    city = lambda name, tag, c, prev: f'''<div class="col"><div class="city">{name}<span class="tag">{tag}</span></div>
<div class="big num">{f(c["sell"])}</div><div class="sub"><span>فرۆشتن</span><span>کڕین <b>{num(c["buy"])}</b></span></div>{chg(c["sell"], prev)}</div>'''
    cards = ''.join(f'''<div class="cc">{flag(code)}<div class="t"><div class="n">{name}</div><div class="u">{unit}</div></div>
<div class="v"><span class="num">{f(v)}</span><small>دینار</small></div></div>''' for code, name, unit, v in cur)
    bars = ''.join(f'''<div class="gb">{bar(k)}<div class="k">عەیاری {k}</div><div class="iq num">{f(iq)}</div>
<div class="us">دینار <span class="usd num">${f(us)}</span></div></div>''' for k, us, iq in gold)
    src = ('سەرچاوە: نرخی دۆلار، شەفەق نیوز (بۆرسەی دراوی هەولێر و بەغدا، ' + d['usd']['as_of'] + ')؛ '
           'نرخی دراوەکانی تر و زێڕ بەپێی نرخی جیهانی و نرخی دۆلار لە بازاڕی هەولێر هەژمار کراون. نرخی زێڕ بەبێ کرێی دروستکردنە.')
    return f'''<section style="height:{H}px">{GRAIN}
<div class="top" style="top:{y['top']}px"><div><h1>نرخی <em>دراو و زێڕ</em></h1><div class="dt">{date_ku(d['date'])}</div></div>
<div class="live"><i></i>کاتژمێر <span class="num">{d['time']}</span></div></div>
<div class="hero" style="top:{y['hero']}px"><div class="hd">{flag('USD', 26)}100 دۆلاری ئەمریکی <small>بە دینار</small></div>
<div class="cols">{city('هەولێر', 'هەرێم', u['erbil'], p.get('erbil_sell'))}{city('بەغدا', 'عێراق', u['baghdad'], p.get('baghdad_sell'))}</div></div>
<div class="grid" style="top:{y['grid']}px">{cards}</div>
<div class="gold" style="top:{y['gold']}px"><div class="gh"><b>زێڕ</b><span>نرخی یەک مسقاڵ (5 گرام) · ئۆنسە لە بازاڕی جیهانی <span class="num">${f(d['xau_usd'])}</span></span></div>
<div class="bars">{bars}</div></div>
<div class="ft" style="top:{y['ft']}px"><div class="s">{src}</div><div class="r"><img src="{logo}"><span>@dinarchi.iq</span></div></div>
</section>'''


def main(path):
    d = json.load(open(path))
    out = os.path.join(HERE, 'daily', d['date']); os.makedirs(out, exist_ok=True)
    json.dump(d, open(os.path.join(out, 'data.json'), 'w'), ensure_ascii=False, indent=1)
    post = board(d, 1350, dict(top=40, hero=196, grid=596, gold=856, ft=1206))
    story = board(d, 1920, dict(top=200, hero=400, grid=830, gold=1130, ft=1600))
    for name, body in (('board', post), ('story', story)):
        open(os.path.join(out, name + '.html'), 'w').write(f'<!doctype html><html lang="ckb"><head><meta charset="utf-8">{FONTS}<style>{CSS}</style></head><body>{body}</body></html>')
    e, cur, gold = compute(d)
    json.dump({'erbil_rate': e, 'currencies': cur, 'gold': gold}, open(os.path.join(out, 'computed.json'), 'w'), ensure_ascii=False, indent=1)
    from caption import make
    open(os.path.join(out, 'caption.txt'), 'w').write(make(d))
    print(out)


if __name__ == '__main__':
    main(sys.argv[1])
