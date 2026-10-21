# Daily rates posters (@dinarchi.iq)

Every day at 18:00 Baghdad: a three-poster Kurdish carousel (dollar, gold, currencies), the round-18 design from the "Design · rates board, pro branding" thread.

- `dinarchi.py` reads the day's prices from the Dinarchi app (`app.dinarchi.com/api/board` and `/api/markets`): 100 USD in Erbil (with the app's daily change) and Baghdad, gold 24/21/18 per mithqal, the world gold ounce, and 100 EUR/GBP/TRY/JPY in Erbil. It writes `data/<date>.json`. Exit 2 = a price is missing, older than 36 hours or out of range, so nothing is posted.
- `posters.py` + `shoot.js` draw `daily/<date>/post-1.jpg`..`post-3.jpg` and `caption.txt` (brand font Noto Kufi Arabic, 3D art in `art/`). `shoot.js` fails if the font does not load or any text is under 30px or near an edge.
- `post.py` publishes the three images as one carousel with the Instagram API.
- `.github/workflows/rates-daily.yml` runs it all at 18:00 Baghdad every day except Friday. It **only publishes when the repository variable `RATES_AUTOPOST` is `on`** (Settings → Secrets and variables → Actions → Variables) and needs the secrets `IG_USER_ID` and `IG_ACCESS_TOKEN`. Any failure stops the post and fails the run, so GitHub emails the owner.

The older single-board pipeline (`fetch.py`, `build.py`, `render.js`, Shafaq News + world rates) is kept for reference but is no longer run.
