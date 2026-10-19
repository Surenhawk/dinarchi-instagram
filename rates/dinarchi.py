"""Read today's prices from the Dinarchi app (app.dinarchi.com/api/board + /api/markets) and write data/<date>.json for posters.py.
python3 dinarchi.py --date 2026-10-19      Exit 0 = ok, 2 = the app's numbers need a human look (missing, stale or out of range).
The dollar's change is today's price minus YESTERDAY'S CLOSE (the last daily close before <date> in /api/history), not the
board's own "delta", which is measured from an earlier reading of the same day (19 Oct: Baghdad +100 on the board, −400 vs close)."""
import argparse, datetime as dt, json, os, sys, urllib.request

APP = 'https://app.dinarchi.com/api'
HERE = os.path.dirname(os.path.abspath(__file__))
BAGHDAD = dt.timezone(dt.timedelta(hours=3))
CITY = 'erbil'
CURS = ['EUR100', 'GBP100', 'TRY100', 'JPY100']


def get(path):
    req = urllib.request.Request(f'{APP}/{path}', headers={'User-Agent': 'dinarchi-rates-bot', 'Accept': 'application/json'})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def closes(asset, city, day):
    """(today's close, (yesterday's close, its date)) from the app's daily history. Yesterday = the last day before `day`
    with a reading, so a market holiday is skipped. Today's close is None if the app has no reading for `day` yet."""
    pts = get(f'history?asset={asset}&city={city}&days=10').get('points') or []
    on = lambda p: dt.datetime.fromtimestamp(p['time'], BAGHDAD).date().isoformat()
    today = next((round(p['value']) for p in pts if on(p) == day), None)
    before = [p for p in pts if on(p) < day]
    if not before:
        return today, (None, None)
    p = max(before, key=lambda p: p['time'])
    return today, (round(p['value']), on(p))


def main(day):
    board, markets = get('board')['rows'], get('markets')['assets']
    row = lambda a, c=None: next((r for r in board if r['asset'] == a and (c is None or r['city'] == c)), None)
    problems, out = [], {'date': day, 'source': 'app.dinarchi.com', 'read_at': dt.datetime.now(dt.timezone.utc).isoformat(timespec='seconds')}

    def take(a, c, lo, hi):
        r = row(a, c)
        if not r:
            problems.append(f'{a} {c or ""} missing'); return None
        seen = dt.datetime.fromisoformat(r['observed_at']).astimezone(BAGHDAD)
        if (dt.datetime.now(BAGHDAD) - seen).total_seconds() > 36 * 3600:
            problems.append(f'{a} {c or ""} stale: observed {seen:%Y-%m-%d %H:%M}')
        if not lo <= r['value'] <= hi:
            problems.append(f'{a} {c or ""} = {r["value"]} outside {lo}-{hi}')
        return {'value': round(r['value']), 'delta': round(r.get('delta') or 0), 'observed_at': r['observed_at']}

    out['usd'] = {c: take('USD100', c, 100000, 300000) for c in (CITY, 'baghdad')}
    for c, r in out['usd'].items():
        if not r:
            continue
        close, (prev, on) = closes('USD100', c, day)
        # posted at 18:00 when the market closes: show today's close, so tomorrow's change starts from the number we posted
        r['board_value'], r['app_delta'], r['prev_close'], r['prev_date'] = r['value'], r['delta'], prev, on
        if close is not None:
            r['value'] = close
        if prev is None:   # never fall back to "no change": a missing close stops the post
            problems.append(f'USD100 {c} has no previous close'); r['delta'] = None
        else:
            r['delta'] = r['value'] - prev
            if abs(r['delta']) > 10000:
                problems.append(f'USD100 {c} moved {r["delta"]} since {on}: check')
    out['gold'] = {k: take(f'XAU_MITHQAL_{k}', None, 200000, 5000000) for k in ('24', '21', '18')}
    out['cur'] = {a[:3]: take(a, CITY, 100, 2000000) for a in CURS}
    oz = next((m for m in markets if m['key'] == 'MTL_XAU'), None)
    out['xau_usd'] = round(oz['price']) if oz else None
    if not oz or not 1000 <= oz['price'] <= 20000:
        problems.append(f'world gold ounce bad: {oz and oz["price"]}')
    os.makedirs(os.path.join(HERE, 'data'), exist_ok=True)
    json.dump(out, open(os.path.join(HERE, 'data', f'{day}.json'), 'w'), indent=1, ensure_ascii=False)
    print(json.dumps(out, ensure_ascii=False))
    if problems:
        print('NEEDS A LOOK:', '; '.join(problems), file=sys.stderr); sys.exit(2)


if __name__ == '__main__':
    ap = argparse.ArgumentParser(); ap.add_argument('--date', default=dt.datetime.now(BAGHDAD).date().isoformat())
    main(ap.parse_args().date)
