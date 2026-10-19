"""Collect today's numbers for the rates board -> data/<date>.json, and print what it read so a human/Claude can verify.
python3 fetch.py [--date 2026-10-19] [--time 11:00]
- Dollar (Erbil + Baghdad shops, Baghdad bourse): Shafaq News Arabic, the newest same-day dollar report.
- EUR/GBP/TRY/JPY per USD: open.er-api.com (daily reference rates), applied to the Erbil market dollar.
- Gold: gold-api.com spot ounce; mithqal = 5 g; cross-checked against Shafaq's Baghdad 21k report.
Exit 3 = no same-day Shafaq report yet (retry later); 2 = something needs a look (parse failed, big gap); 0 = ok."""
import json, re, os, sys, urllib.request, datetime as dt, argparse
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import shafaq

HERE = os.path.dirname(os.path.abspath(__file__))
BAGHDAD = dt.timezone(dt.timedelta(hours=3))
ap = argparse.ArgumentParser(); ap.add_argument('--date'); ap.add_argument('--time', default='11:00')
a = ap.parse_args()
now = dt.datetime.now(BAGHDAD)
day = a.date or now.date().isoformat()
warn = []


def js(u):
    return json.load(urllib.request.urlopen(urllib.request.Request(u, headers=shafaq.UA), timeout=30))


fx = js('https://open.er-api.com/v6/latest/USD')
gold = js('https://api.gold-api.com/price/XAU')


def text(u):
    s = shafaq.get(u)
    d = (re.findall(r'"datePublished":"([^"]+)"', s) or [''])[0]
    t = re.sub(r'<script.*?</script>|<style.*?</style>', '', s, flags=re.S)
    t = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', t))
    import html; t = html.unescape(t)
    i = t.find('بحسب مراسل'); i = i if i > 0 else max(t.find('شفق نيوز'), 0)
    return d, t[i:i + 1800]


def same_day(d):
    return d and dt.datetime.fromisoformat(d).astimezone(BAGHDAD).date().isoformat() == day


usd = gold_sh = prev_close = None
prev_day = (dt.date.fromisoformat(day) - dt.timedelta(days=1)).isoformat()
SELL = r'البيع\D{0,20}(\d{6}).{0,120}?الشراء\D{0,20}(\d{6})'
for title, u in shafaq.listing():          # newest first
    d, t = text(u)
    pday = d and dt.datetime.fromisoformat(d).astimezone(BAGHDAD).date().isoformat()
    is_usd = 'دولار' in title or 'الصرف' in title
    er = re.search(r'أربيل.{0,160}?' + SELL, t)
    bg = re.search(r'(?:محال الصيرفة|الأسواق المحلية).{0,160}?' + SELL, t)
    if is_usd and pday == day and usd is None:
        bo = re.search(r'الكفاح والحارثية\D{0,80}?(\d{6})', t)
        usd = dict(title=title, url=u, published=d, text=t, erbil=er and er.groups(), baghdad=bg and bg.groups(), bourse=bo and bo.group(1))
    elif is_usd and pday == prev_day and prev_close is None and er and bg:
        prev_close = {'erbil_sell': int(er.group(1)), 'baghdad_sell': int(bg.group(1)), 'url': u, 'published': d}
    elif not is_usd and pday == day and gold_sh is None and ('الذهب' in title or 'المثقال' in title):
        m = re.search(r'عيار 21 بلغ (\d{3,4}) ألف', t)
        gold_sh = dict(title=title, url=u, published=d, text=t, g21_baghdad=m and int(m.group(1)) * 1000)

out = {'date': day, 'time': a.time,
       'fx_per_usd': {k: fx['rates'][k] for k in ('EUR', 'GBP', 'TRY', 'JPY')}, 'fx_as_of': fx['time_last_update_utc'],
       'xau_usd': gold['price'], 'xau_as_of': gold['updatedAt'], 'sources': {}}
if not usd:
    warn.append(f'NO same-day Shafaq dollar report for {day} yet')
else:
    print('DOLLAR REPORT:', usd['title'], usd['published'], usd['url'], '\n', usd['text'][:1200], '\n')
    out['sources']['usd'] = usd['url']
    if usd['erbil'] and usd['baghdad']:
        hhmm = dt.datetime.fromisoformat(usd['published']).astimezone(BAGHDAD).strftime('%H:%M')
        from build import MONTHS
        x = dt.date.fromisoformat(day)
        out['usd'] = {'as_of': f'{x.day}ی {MONTHS[x.month - 1]}، کاتژمێر {hhmm}',
                      'erbil': {'sell': int(usd['erbil'][0]), 'buy': int(usd['erbil'][1])},
                      'baghdad': {'sell': int(usd['baghdad'][0]), 'buy': int(usd['baghdad'][1])},
                      'bourse_baghdad': usd['bourse'] and int(usd['bourse'])}
    else:
        warn.append('could not parse Erbil/Baghdad sell+buy; fill usd by hand from the text above')

if prev_close:
    out['prev'] = prev_close            # yesterday's last Shafaq report (normally the close)
else:
    pf = os.path.join(HERE, 'data', prev_day + '.json')
    if os.path.exists(pf):
        p = json.load(open(pf))
        out['prev'] = {'erbil_sell': p['usd']['erbil']['sell'], 'baghdad_sell': p['usd']['baghdad']['sell'], 'from': pf}
    else:
        warn.append('no yesterday figure: change line will be hidden')

if 'usd' in out:
    e = out['usd']['erbil']['sell'] / 100
    g21 = gold['price'] / 31.1035 * 5 * 21 / 24 * e
    if gold_sh and gold_sh['g21_baghdad']:
        gap = g21 / gold_sh['g21_baghdad'] - 1
        print(f'GOLD CHECK: computed 21k mithqal {g21:,.0f} vs Shafaq Baghdad {gold_sh["g21_baghdad"]:,} ({gap:+.1%})')
        out['sources']['gold_check'] = gold_sh['url']
        if abs(gap) > .03: warn.append(f'gold 21k differs {gap:+.1%} from Shafaq Baghdad market')
    e_b = out['usd']['baghdad']['sell'] / 100
    if abs(e / e_b - 1) > .03: warn.append('Erbil vs Baghdad dollar gap > 3%, double-check')

os.makedirs(os.path.join(HERE, 'data'), exist_ok=True)
fn = os.path.join(HERE, 'data', day + '.json')
json.dump(out, open(fn, 'w'), ensure_ascii=False, indent=1)
print('WROTE', fn); print(json.dumps({k: v for k, v in out.items() if k != 'sources'}, ensure_ascii=False))
for w in warn: print('WARN:', w)
sys.exit(3 if any(w.startswith('NO same-day') for w in warn) else 2 if [w for w in warn if not w.startswith('no yesterday')] else 0)
