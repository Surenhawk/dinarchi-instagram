"""Publish the day's three posters to Instagram as one carousel, then the dollar poster as a story (Instagram API with Instagram Login).
python3 post.py <date> <public-base-url>     e.g. post.py 2026-10-19 https://surenhawk.github.io/dinarchi-instagram/rates/daily/2026-10-19
Env: IG_USER_ID, IG_ACCESS_TOKEN. Writes daily/<date>/published.json.
The story (brand Step 5) is best-effort: if Instagram refuses it, the carousel stays posted and the run still succeeds."""
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


# Image description for screen readers and search; Instagram indexes alt text alongside captions.
ALT = 'تابلۆی نرخی دۆلار، زێڕ و دراوەکان لە هەولێر، سلێمانی، بەغدا، بەسرە و دهۆک، {day}. دینارچی'


def item(uid, image_url, alt):
    """Carousel child with alt text; retried without it if the API rejects the field,
    so a missing alt never costs the day's post."""
    params = dict(image_url=image_url, is_carousel_item='true')
    try:
        return call('POST', f'{uid}/media', alt_text=alt, **params)['id']
    except SystemExit as e:
        print(f'alt_text rejected, posting without it: {e}', file=sys.stderr)
        return call('POST', f'{uid}/media', **params)['id']


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
    """Post story.jpg as an Instagram story. Returns the result dict, or the error text; never stops the run."""
    try:
        cid = call('POST', f'{uid}/media', media_type='STORIES', image_url=image_url)['id']
        ready(cid)
        return {'media_id': call('POST', f'{uid}/media_publish', creation_id=cid)['id']}
    except SystemExit as e:
        print(f'story not posted: {e}', file=sys.stderr)
        return {'error': str(e)[:300]}


def main(day, base):
    out = os.path.join(HERE, 'daily', day)
    done = os.path.join(out, 'published.json')
    if os.path.exists(done):
        sys.exit(f'already published {day}: {open(done).read()}')
    uid = os.environ['IG_USER_ID']
    caption = open(os.path.join(out, 'caption.txt')).read()
    kids = []
    for i in range(1, 4):
        kid = item(uid, f'{base}/post-{i}.jpg', ALT.format(day=day))
        ready(kid)
        kids.append(kid)
    cid = call('POST', f'{uid}/media', media_type='CAROUSEL', children=','.join(kids), caption=caption)['id']
    ready(cid)
    mid = call('POST', f'{uid}/media_publish', creation_id=cid)['id']
    res = {'feed': {'media_id': mid, 'permalink': call('GET', mid, fields='permalink').get('permalink', '')}}
    res['at'] = time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
    json.dump(res, open(done, 'w'), indent=1)            # the feed post is recorded before the story is tried
    if os.path.exists(os.path.join(out, 'story.jpg')):
        res['story'] = story(uid, f'{base}/story.jpg')
        json.dump(res, open(done, 'w'), indent=1)
    print('PUBLISHED', json.dumps(res))


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2].rstrip('/'))
