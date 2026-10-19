"""Publish the day's three posters to Instagram as one carousel (Instagram API with Instagram Login).
python3 post.py <date> <public-base-url>     e.g. post.py 2026-10-19 https://surenhawk.github.io/dinarchi-instagram/rates/daily/2026-10-19
Env: IG_USER_ID, IG_ACCESS_TOKEN. Writes daily/<date>/published.json."""
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


def main(day, base):
    out = os.path.join(HERE, 'daily', day)
    done = os.path.join(out, 'published.json')
    if os.path.exists(done):
        sys.exit(f'already published {day}: {open(done).read()}')
    uid = os.environ['IG_USER_ID']
    caption = open(os.path.join(out, 'caption.txt')).read()
    kids = []
    for i in range(1, 4):
        kid = call('POST', f'{uid}/media', image_url=f'{base}/post-{i}.jpg', is_carousel_item='true')['id']
        ready(kid)
        kids.append(kid)
    cid = call('POST', f'{uid}/media', media_type='CAROUSEL', children=','.join(kids), caption=caption)['id']
    ready(cid)
    mid = call('POST', f'{uid}/media_publish', creation_id=cid)['id']
    res = {'feed': {'media_id': mid, 'permalink': call('GET', mid, fields='permalink').get('permalink', '')}}
    res['at'] = time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
    json.dump(res, open(done, 'w'), indent=1)
    print('PUBLISHED', json.dumps(res))


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2].rstrip('/'))
