#!/bin/bash
# Build 135 deploy (runs ON the VM). 3D art on the dinar sheet: tab bar, dollar-journey stations, 17 goods chips.
# Ships static/app.js, static/index.html, 19 new webp in static/art (~85 KB), webapp.py (BUILD bump only).
set -euo pipefail
UP=/home/LEGION
APP=/home/sureno_hm/dinarchiAI
RB=/home/LEGION/rollback_135
FREE_MB=$(df -Pm $APP | awk 'NR==2{print $4}')
echo "== disk free on app volume: ${FREE_MB} MB"; df -h $APP | tail -1
[ "$FREE_MB" -ge 500 ] || { echo "ABORT: under 500 MB free - not deploying"; exit 1; }
N=$(ls $UP/art135/*.webp | wc -l); echo "== art files uploaded: $N"; [ "$N" -eq 19 ] || { echo "ABORT: expected 19 art files"; exit 1; }
echo "== live files must still be build 134"
[ "$(md5sum < $APP/static/app.js | cut -d' ' -f1)" = "3cc79b269a9c9746ffd81962f19128a3" ] || { echo "ABORT: live app.js is not build 134"; exit 1; }
[ "$(md5sum < $APP/static/index.html | cut -d' ' -f1)" = "3a97d1cce926bcbaaf5fa17eb1f5b51a" ] || { echo "ABORT: live index.html is not build 134"; exit 1; }
[ "$(md5sum < $APP/webapp.py | cut -d' ' -f1)" = "09ec74dbd6043c0eba519c4ab24d9abe" ] || { echo "ABORT: live webapp.py is not build 134"; exit 1; }
echo "== uploaded md5"; md5sum $UP/app.js $UP/index.html $UP/webapp.py
[ "$(md5sum < $UP/app.js | cut -d' ' -f1)" = "9abe2beac35eda9f9d7deabc8eae8821" ] || { echo "ABORT: uploaded app.js hash wrong"; exit 1; }
[ "$(md5sum < $UP/index.html | cut -d' ' -f1)" = "7ba8027a492801e0a7279b139fb8488d" ] || { echo "ABORT: uploaded index.html hash wrong"; exit 1; }
[ "$(md5sum < $UP/webapp.py | cut -d' ' -f1)" = "71ae08ceac076e31a89b01326005854e" ] || { echo "ABORT: uploaded webapp.py hash wrong"; exit 1; }
python3 -c "import ast; ast.parse(open('$UP/webapp.py').read())" && echo "webapp.py syntax OK"
echo "== backup to $RB"; mkdir -p $RB/static
sudo cp -p $APP/webapp.py $RB/; sudo cp -p $APP/static/app.js $APP/static/index.html $RB/static/
sudo chown -R LEGION $RB 2>/dev/null || true
echo "== install"
sudo cp $UP/art135/*.webp $APP/static/art/; sudo chown -R sureno_hm:sureno_hm $APP/static/art
sudo cp $UP/webapp.py $APP/webapp.py; sudo cp $UP/app.js $UP/index.html $APP/static/
sudo chown sureno_hm:sureno_hm $APP/webapp.py $APP/static/app.js $APP/static/index.html
md5sum $APP/static/app.js $APP/static/index.html $APP/webapp.py
sudo systemctl restart dinarchi-web
for i in 1 2 3 4 5 6 7 8 9 10; do sleep 1; B=$(curl -s 127.0.0.1:8077/api/build || true); [ -n "$B" ] && break; done
echo "service: $(systemctl is-active dinarchi-web)"
echo "local /api/build: $B"
echo "home: $(curl -s -o /dev/null -w %{http_code} 127.0.0.1:8077/)  app.js: $(curl -s -o /dev/null -w %{http_code} 127.0.0.1:8077/static/app.js)  rice art: $(curl -s -o /dev/null -w %{http_code} 127.0.0.1:8077/static/art/g-rice.webp)  journey art: $(curl -s -o /dev/null -w %{http_code} 127.0.0.1:8077/static/art/journey.webp)"
echo "== memory"; free -m | head -2
echo "== disk after"; df -h $APP | tail -1
case "$B" in *2026-10-21-135*) echo "DEPLOY OK";; *) echo "DEPLOY NOT CONFIRMED - run rollback_135.sh"; exit 1;; esac
