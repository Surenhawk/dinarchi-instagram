# Daily rates posters (@dinarchi.iq)

Every day at 11:00 Baghdad: three Kurdish Instagram Stories (dollar, gold, currencies) in the round-18 design from the "Design · rates board, pro branding" thread. Since 23 Oct 2026 the rates go to Stories only, not the feed. An Arabic edition is drawn alongside it.

- `dinarchi.py` reads the day's prices from the Dinarchi app (`app.dinarchi.com/api/board` and `/api/markets`): 100 USD in Erbil (with the app's daily change) and Baghdad, gold 24/21/18 per mithqal, the world gold ounce, and 100 EUR/GBP/TRY/JPY in Erbil. It writes `data/<date>.json`. Exit 2 = a price is missing, older than 36 hours or out of range, so nothing is posted.
- `posters.py` + `shoot.js` draw `daily/<date>/post-1.jpg`..`post-3.jpg`, `story-1.jpg`..`story-3.jpg` (1080x1920) and `caption.txt` (brand font Noto Kufi Arabic, 3D art in `art/`). `shoot.js` fails if the font does not load or any text is under 30px or near an edge.
  - Captions follow brand Step 5: Western digits, the change since yesterday's close, a `source · time` line, `@dinarchi_bot` as the call to action, five hashtags, no emoji but ▲ ▼. The posters' Telegram handle is `@dinarchi_bot`.
  - `--lang ar` draws the Arabic edition into `daily/<date>/ar/` (Baghdad first, `@dinarchi.ar`). The two editions never mix. It is not posted until the Arabic Instagram account exists.
- `post.py` publishes `story-1.jpg`..`story-3.jpg` as three Stories with the Instagram API. `published.json` is written after each one, so a rerun only posts the stories still missing.
- `.github/workflows/daily-rates.yml` runs it all at 11:00 Baghdad every day except Friday. It **only publishes when the repository variable `RATES_AUTOPOST` is `on`** (Settings → Secrets and variables → Actions → Variables) and needs the secrets `IG_USER_ID` and `IG_ACCESS_TOKEN`. Any failure stops the post and fails the run, so GitHub emails the owner.

The older single-board pipeline (`fetch.py`, `build.py`, `render.js`, Shafaq News + world rates) is kept for reference but is no longer run.
