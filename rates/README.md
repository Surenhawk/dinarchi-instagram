# Daily rates board (@dinarchi.iq)

One Kurdish image a day (1080x1350 feed post + 1080x1920 story): 100 USD in Erbil and Baghdad, EUR, GBP, TRY, JPY, and gold 24/21/18 per mithqal.

- `fetch.py` reads Shafaq News' same-day dollar report (Erbil + Baghdad shops), open.er-api.com cross rates and the gold-api.com spot ounce, then writes `data/<date>.json`. Exit 3 = no report yet, 2 = needs a human look, 0 = ok. It cross-checks computed 21k gold against Shafaq's Baghdad gold report (warns above 3%).
- `build.py` + `render.js` draw `daily/<date>/board.jpg`, `story.jpg`, `caption.txt`.
- `post.py` publishes the feed image and the story with the Instagram API.
- `.github/workflows/daily-rates.yml` runs it all at 11:00 Baghdad. It **only publishes when the repository variable `RATES_AUTOPOST` is `on`** (Settings → Secrets and variables → Actions → Variables) and needs the secrets `IG_USER_ID` and `IG_ACCESS_TOKEN`. Any warning from `fetch.py` stops the post and fails the run, so GitHub emails the owner.

Other currencies and gold are computed: world rate × Erbil market dollar. Mithqal = 5 g. Gold excludes the making fee.
