#!/bin/bash
# Build 137 deploy (runs ON the VM). Speed clean-up (231 unused CSS rules + 2 unused font families removed)
# and light-friendly up/down colours (candles, vote buttons, vote bar, Telegram card). Ships static/index.html
# and webapp.py (BUILD bump only). app.js and art untouched.
set -euo pipefail
UP=/home/LEGION
APP=/home/sureno_hm/dinarchiAI
RB=/home/LEGION/rollback_137
FREE_MB=$(df -Pm $APP | awk 'NR==2{print $4}')
echo "== disk free on app volume: ${FREE_MB} MB"; df -h $APP | tail -1
[ "$FREE_MB" -ge 500 ] || { echo "ABORT: under 500 MB free - not deploying"; exit 1; }
echo "== live files must still be build 136"
[ "$(md5sum < $APP/static/index.html | cut -d' ' -f1)" = "968e6d99afbcf6bb21dadce8e76bef1c" ] || { echo "ABORT: live index.html is not build 136"; exit 1; }
[ "$(md5sum < $APP/webapp.py | cut -d' ' -f1)" = "9c6ee6709e639a5d915548d9f15fe994" ] || { echo "ABORT: live webapp.py is not build 136"; exit 1; }
[ "$(md5sum < $APP/static/app.js | cut -d' ' -f1)" = "c4538f2201ff1608f488d3c94e64ef0b" ] || { echo "ABORT: live app.js is not build 136"; exit 1; }
[ "$(md5sum < $UP/index.html | cut -d' ' -f1)" = "c0a9db95b13150a47e44b59189ec9368" ] || { echo "ABORT: uploaded index.html hash wrong"; exit 1; }
[ "$(md5sum < $UP/webapp.py | cut -d' ' -f1)" = "e1ba2b174070c2c14112d149fecf043c" ] || { echo "ABORT: uploaded webapp.py hash wrong"; exit 1; }
python3 -c "import ast; ast.parse(open('$UP/webapp.py').read())" && echo "webapp.py syntax OK"
echo "== backup to $RB"; mkdir -p $RB/static
sudo cp -p $APP/webapp.py $RB/; sudo cp -p $APP/static/index.html $RB/static/
sudo chown -R LEGION $RB 2>/dev/null || true
echo "== install"
sudo cp $UP/webapp.py $APP/webapp.py; sudo cp $UP/index.html $APP/static/index.html
sudo chown sureno_hm:sureno_hm $APP/webapp.py $APP/static/index.html
md5sum $APP/static/index.html $APP/webapp.py
sudo systemctl restart dinarchi-web
for i in 1 2 3 4 5 6 7 8 9 10; do sleep 1; B=$(curl -s 127.0.0.1:8077/api/build || true); [ -n "$B" ] && break; done
echo "service: $(systemctl is-active dinarchi-web)"
echo "local /api/build: $B"
echo "home: $(curl -s -o /dev/null -w '%{http_code} %{size_download}B' 127.0.0.1:8077/)  board: $(curl -s -o /dev/null -w %{http_code} 127.0.0.1:8077/api/board)  light card: $(curl -s -o /dev/null -w %{http_code} '127.0.0.1:8077/api/card.png?variant=light')"
echo "== memory"; free -m | head -2
echo "== disk after"; df -h $APP | tail -1
case "$B" in *2026-10-21-137*) echo "DEPLOY OK";; *) echo "DEPLOY NOT CONFIRMED - run rollback_137.sh"; exit 1;; esac
