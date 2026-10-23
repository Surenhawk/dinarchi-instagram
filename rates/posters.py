"""The three daily posters (dollar, gold, currencies) as designed in round 18 of the "Design · rates board, pro branding" thread,
plus the same three posters as 9:16 stories, filled from data/<date>.json (dinarchi.py).
python3 posters.py data/2026-10-19.json [--lang ku|ar] -> daily/<date>/posters.html + caption.txt (Arabic edition: daily/<date>/ar/);
then node shoot.js daily/<date> -> post-1.jpg .. post-3.jpg (1080x1350) + story-1.jpg .. story-3.jpg (1080x1920).
Brand Step 5 (2026-10-22): two editions that never mix — Kurdish (@dinarchi.iq, Erbil first) and Arabic (@dinarchi.ar,
Baghdad first); captions in Western digits with a source · time line, every post pointing to @dinarchi_bot."""
import argparse, base64, datetime as dt, json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from build import DAYS

INK, STONE, GREEN, RED = '#111111', '#3D3832', '#047857', '#BE123C'
TG_HANDLE = '@dinarchi_bot'                 # every post points to the bot (Step 0)
BAGHDAD = dt.timezone(dt.timedelta(hours=3))
N = 3
RLM = '‏'
K = dict(usd100='100 دۆلار', erbil='هەولێر', baghdad='بەغدا', vs='لە چاو دوێنێ', nochange='بێ گۆڕان', karat='عەیاری',
         mithqal='یەک مسقاڵ', in_dinar='بە دینار', world_gold='زێڕی جیهانی', per_oz='بۆ هەر ئۆنسەیەک', swipe='بڕۆ',
         t_usd='نرخی دۆلار', t_gold='نرخی زێڕ', t_cur='نرخی دراوەکان')
CURS = [('EUR', 'یۆرۆ', '100 یۆرۆ'), ('GBP', 'پاوەند', '100 پاوەندی بەریتانی'),
        ('TRY', 'لیرە', '100 لیرەی تورکی'), ('JPY', 'یەن', '100 یەنی ژاپۆنی')]
K_AR = dict(usd100='100 دولار', erbil='أربيل', baghdad='بغداد', vs='مقارنة بالأمس', nochange='بلا تغيير', karat='عيار',
            mithqal='المثقال', in_dinar='بالدينار', world_gold='الذهب العالمي', per_oz='للأونصة', swipe='اسحب',
            t_usd='سعر الدولار', t_gold='سعر الذهب', t_cur='أسعار العملات')
CURS_AR = [('EUR', 'اليورو', '100 يورو'), ('GBP', 'الجنيه', '100 جنيه إسترليني'),
           ('TRY', 'الليرة', '100 ليرة تركية'), ('JPY', 'الين', '100 ين ياباني')]
DAYS_AR = ['الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد']
# Step 5 captions (dinarchi-touchpoints.json, ig.caption). {time} = when the numbers were read, Baghdad time.
CAPTION = {
    'ku': 'نرخی دۆلار و زێڕ ئەمڕۆ · {weekday} {date}\n\nهەولێر: $100 = {erbil} {erbil_change}\nبەغدا: $100 = {baghdad} {baghdad_change}\n'
          'زێڕی عەیار 21: مسقاڵێک {gold21}\nیۆرۆ: €100 = {eur}\n\nسەرچاوە: {source} · {time}\n'
          'نرخی ڕاستەوخۆ و ئاگادارکردنەوە: @dinarchi_bot\n\n#نرخی_دۆلار #زێڕ #دینار #هەولێر #دینارچی',
    'ar': 'سعر الدولار والذهب اليوم · {weekday} {date}\n\nبغداد: $100 = {baghdad} {baghdad_change}\nأربيل: $100 = {erbil} {erbil_change}\n'
          'ذهب عيار 21: المثقال {gold21}\nاليورو: €100 = {eur}\n\nالمصدر: {source} · {time}\n'
          'السعر المباشر والتنبيهات: @dinarchi_bot\n\n#سعر_الدولار #الذهب #الدينار_العراقي #بغداد #دينارچي',
}
LANG = {
    'ku': dict(k=K, curs=CURS, days=DAYS, ig='@dinarchi.iq', html='ckb', lead='erbil', other='baghdad', source='ئەپی دینارچی'),
    'ar': dict(k=K_AR, curs=CURS_AR, days=DAYS_AR, ig='@dinarchi.ar', html='ar', lead='baghdad', other='erbil', source='تطبيق دينارچي'),
}
IG = '<svg viewBox="0 0 24 24"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.4" cy="6.6" r="1.3" fill="currentColor"/></svg>'
TG = '<svg viewBox="0 0 24 24"><path d="M3 11.4 L20.5 4.6 L17.6 19.4 L11.6 15 L9.2 17.6 L9.5 13.3 L16.8 7.6 L7.8 12.6 Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>'
f = lambda n: f'{int(round(n)):,}'


def art(name):
    return 'data:image/png;base64,' + base64.b64encode(open(os.path.join(HERE, 'art', name + '.png'), 'rb').read()).decode()


def chip(delta, k=K):
    if not delta:
        return f'<span class="chip" style="color:{STONE};background:rgba(0,0,0,.05)">{k["nochange"]}</span>'
    col, txt = (GREEN, f'▲ +{f(delta)}') if delta > 0 else (RED, f'▼ −{f(-delta)}')
    return f'<span class="chip" style="color:{col};background:{col}17"><span class="n">{txt}</span></span>'


def row(label, val):
    return f'<div class="row"><span>{label}</span><span class="n">{val}</span></div>'


def hero_card(name, w, label, hero, extra):
    return f"""<div class="card hero-card"><img class="obj" src="{art(name)}" style="width:{w}px">
  <div class="lab">{label}</div><div class="n hero">{hero}</div>{extra}</div>"""


def frame(i, title, body, day, t=None, story=False):
    t = t or LANG['ku']
    x = dt.date.fromisoformat(day)
    date = f'<div class="stack"><b>{t["days"][x.weekday()]}</b><span class="n">{x.day} / {x.month:02d} / {x.year}</span></div>'
    seg = ''.join(f'<i class="{"on" if k == i else ""}"></i>' for k in range(N))
    nxt = f'<span class="next"><b>{t["k"]["swipe"]}</b><span>→</span></span>' if i < N - 1 else '<span></span>'
    if story:                                       # one frame, nothing to swipe to
        seg, nxt = '', '<span></span>'
    return f"""<div class="post{' story' if story else ''}">
 <div class="top"><img src="{art('wordmark')}" class="wm">{date}</div>
 <div class="title">{title}</div>
 <div class="stage">{body}</div>
 <div class="foot"><span class="segs">{seg}</span><div class="handles"><span>{TG}{TG_HANDLE}</span><span>{IG}{t["ig"]}</span></div>{nxt}</div>
</div>"""


def posters(d, t=None):
    """The three carousel frames + the same three frames at 9:16 for Stories, in edition t."""
    t = t or LANG['ku']
    K, CURS, lead, other = t['k'], t['curs'], t['lead'], t['other']
    u, g = d['usd'], d['gold']
    usd = hero_card('usd', 300, f"{K['usd100']} · {K[lead]}", f(u[lead]['value']),
                    f'<div class="delta">{chip(u[lead]["delta"], K)}<span class="lab2">{K["vs"]}</span></div><div class="rule"></div>'
                    + row(K[other], f(u[other]['value'])))
    gold = hero_card('gold', 270, f"{K['karat']} <span class='n'>21</span> · {K['mithqal']} · {K['in_dinar']}", f(g['21']['value']),
                     '<div class="rule"></div>' + row(f"{K['karat']} <span class='n'>24</span>", f(g['24']['value']))
                     + row(f"{K['karat']} <span class='n'>18</span>", f(g['18']['value']))
                     + row(f"{K['world_gold']} · {K['per_oz']}", f"${f(d['xau_usd'])}"))
    curs = '<div class="card list">' + '<div class="sep"></div>'.join(
        f'<div class="crow"><img src="{art(c.lower())}"><div class="nm"><b>{name}</b><span>{unit}</span></div>'
        f'<span class="n v">{f(d["cur"][c]["value"])}</span></div>' for c, name, unit in CURS) + '</div>'
    pages = ((K['t_usd'], usd), (K['t_gold'], gold), (K['t_cur'], curs))
    return ([frame(i, title, body, d['date'], t) for i, (title, body) in enumerate(pages)]
            + [frame(i, title, body, d['date'], t, story=True) for i, (title, body) in enumerate(pages)])


CSS = f"""
*{{margin:0;padding:0;box-sizing:border-box}} body{{background:#EDEBE6}}
.post{{position:relative;width:1080px;height:1350px;direction:rtl;overflow:hidden;color:{INK};font-family:'Noto Kufi Arabic',sans-serif;
  background:radial-gradient(90% 70% at 50% 50%,#FFFFFF 0%,#FCFBF8 60%,#F3F1EC 100%)}}
.n{{direction:ltr;unicode-bidi:isolate;font-feature-settings:'tnum' 1,'lnum' 1}}
.top{{position:absolute;top:60px;left:72px;right:72px;height:64px;display:flex;align-items:flex-start;justify-content:space-between;direction:ltr}}
.wm{{height:56px}}
.stack{{display:flex;flex-direction:column;align-items:flex-end;direction:rtl;line-height:1.25;border-right:6px solid #C9A04E;padding-right:18px}}
.stack b{{font-size:36px;font-weight:800}} .stack span{{font-size:32px;font-weight:700;color:{STONE}}}
.title{{position:absolute;top:150px;left:0;right:0;text-align:center;font-size:72px;font-weight:800;line-height:1.3}}
.stage{{position:absolute;top:270px;bottom:150px;left:72px;right:72px;display:flex;align-items:center;justify-content:center}}
.card{{position:relative;width:100%;background:#fff;border-radius:44px;
  box-shadow:0 0 0 1px rgba(0,0,0,.05),0 2px 4px rgba(40,30,20,.05),0 34px 70px -24px rgba(40,30,20,.22)}}
.hero-card{{margin-top:110px;padding:130px 64px 44px;text-align:center}}
.obj{{position:absolute;top:0;left:50%;transform:translate(-50%,-52%);filter:drop-shadow(0 26px 30px rgba(40,30,20,.20))}}
.lab{{font-size:36px;font-weight:600;color:{STONE}}}
.hero{{font-size:176px;font-weight:800;line-height:1.12;letter-spacing:-.02em;margin-top:4px}}
.delta{{display:flex;justify-content:center;align-items:center;gap:18px;margin-top:6px}}
.lab2{{font-size:34px;font-weight:600;color:{STONE}}}
.chip{{display:inline-flex;align-items:center;height:64px;padding:0 26px;border-radius:32px;font-size:40px;font-weight:800}}
.rule{{height:2px;background:rgba(0,0,0,.09);margin:26px 0 2px}}
.row{{display:flex;justify-content:space-between;align-items:center;padding:6px 6px;font-size:36px;font-weight:600;color:{STONE}}}
.row .n{{color:{INK};font-weight:800;font-size:46px}}
.list{{padding:20px 56px}}
.crow{{display:flex;align-items:center;gap:28px;height:184px}}
.crow img{{width:140px;height:140px;object-fit:contain;filter:drop-shadow(0 14px 16px rgba(40,30,20,.18))}}
.nm{{display:flex;flex-direction:column;white-space:nowrap}}
.nm b{{font-size:42px;font-weight:800}} .nm span{{font-size:31px;font-weight:600;color:{STONE}}}
.v{{margin-right:auto;font-size:66px;font-weight:800;letter-spacing:-.02em}}
.sep{{height:2px;background:rgba(0,0,0,.08)}}
.foot{{position:absolute;left:72px;right:72px;bottom:56px;height:70px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;direction:ltr}}
.segs{{display:flex;gap:10px;justify-self:start}} .segs i{{width:30px;height:10px;border-radius:5px;background:rgba(0,0,0,.14)}}
.segs i.on{{width:64px;background:{INK}}}
.handles{{display:flex;gap:26px;font-size:30px;color:#1E1B18}}
.handles span{{display:inline-flex;align-items:center;gap:12px;font-weight:600}} .handles svg{{width:32px;height:32px}}
.next{{justify-self:end;display:inline-flex;gap:12px;align-items:center;padding:8px 28px;border-radius:34px;background:{INK};color:#fff;font-size:30px}}
.next b{{font-weight:700}}
.post.story{{height:1920px}} .story .top{{top:250px}} .story .title{{top:350px}}
.story .stage{{top:480px;bottom:420px}} .story .foot{{bottom:300px;grid-template-columns:1fr}} .story .handles{{justify-self:center}}
"""


def caption(d, lang='ku'):
    """Step 5 caption: Western digits, the change since yesterday's close, source · time, the bot. No emoji but ▲ ▼."""
    t = LANG[lang]
    x = dt.date.fromisoformat(d['date'])
    u = d['usd']
    chg = lambda c: (f'{"▲" if c > 0 else "▼"} {f(abs(c))}' if c else '')
    read = dt.datetime.fromisoformat(d['read_at']).astimezone(BAGHDAD) if d.get('read_at') else None
    text = CAPTION[lang].format(
        weekday=t['days'][x.weekday()], date=f'{x.day:02d}/{x.month:02d}/{x.year}',
        erbil=f(u['erbil']['value']), erbil_change=chg(u['erbil'].get('delta')),
        baghdad=f(u['baghdad']['value']), baghdad_change=chg(u['baghdad'].get('delta')),
        gold21=f(d['gold']['21']['value']), eur=f(d['cur']['EUR']['value']),
        source=t['source'], time=f'{read:%H:%M}' if read else '18:00')
    return '\n'.join(RLM + l.rstrip() if l else '' for l in text.split('\n'))


def main(path, lang='ku'):
    d = json.load(open(path))
    t = LANG[lang]
    out = os.path.join(HERE, 'daily', d['date'], *(['ar'] if lang == 'ar' else [])); os.makedirs(out, exist_ok=True)
    page = (f'<!doctype html><html lang="{t["html"]}"><head><meta charset="utf-8">'
            '<link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;500;600;700;800;900&display=block" rel="stylesheet">'
            f'<style>{CSS}</style></head><body>{"".join(posters(d, t))}</body></html>')
    open(os.path.join(out, 'posters.html'), 'w').write(page)
    open(os.path.join(out, 'caption.txt'), 'w').write(caption(d, lang))
    print(out)


if __name__ == '__main__':
    ap = argparse.ArgumentParser(); ap.add_argument('data'); ap.add_argument('--lang', choices=sorted(LANG), default='ku')
    a = ap.parse_args(); main(a.data, a.lang)
