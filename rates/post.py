"""Publish the day's three rates posters to Instagram Stories (dollar, gold, currencies), in that order.
Since 23 Oct 2026 the rates live in Stories, not the feed (growth plan: "Reel-first, rates to Stories").
python3 post.py <date> <public-base-url>     e.g. post.py 2026-10-23 https://surenhawk.github.io/dinarchi-instagram/rates/daily/2026-10-23
Env: IG_USER_ID, IG_ACCESS_TOKEN. Writes daily/<date>/published.json after each story, so a rerun never repeats one."""
import json, os, sys, time, urllib.parse, urllib.request

API = 'https://graph.instagram.com/v23.0'
HERE = os.path.dirname(os.path.abspath(__file__))


def call(method, path, **params):
    params['access_token'] = os.environ['IG_ACCESS_TOKEN']
    data = urllib.parse.urlencode(params)
    req = urllib.request.Request(f'{API}/{path}' + ('?' + data if method == 'GET' else ''),
                                 data=None if method == 'GET' else data.encode(), method=method)
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        sys.exit(f'Instagram API error {e.code} on {path}: {e.read().decode()[:500]}')


def ready(cid):
    for _ in range(60):
        s = call('GET', cid, fields='status_code').get('status_code')
        if s == 'FINISHED':
            return
        if s in ('ERROR', 'EXPIRED'):
            sys.exit(f'container {cid} failed: {s}')
        time.sleep(10)
    sys.exit(f'container {cid} not ready')


def story(uid, image_url):
    cid = call('POST', f'{uid}/media', media_type='STORIES', image_url=image_url)['id']
    ready(cid)
    return call('POST', f'{uid}/media_publish', creation_id=cid)['id']


def main(day, base):
    out = os.path.join(HERE, 'daily', day)
    done = os.path.join(out, 'published.json')
    res = json.load(open(done)) if os.path.exists(done) else {}
    if 'stories' not in res and res:
        sys.exit(f'already published {day}: {json.dumps(res)}')
    res.setdefault('stories', [])
    uid = os.environ['IG_USER_ID']
    for i in range(len(res['stories']) + 1, 4):
        res['stories'].append({'frame': i, 'media_id': story(uid, f'{base}/story-{i}.jpg')})
        res['at'] = time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
        json.dump(res, open(done, 'w'), indent=1)
    print('PUBLISHED', json.dumps(res))


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2].rstrip('/'))
