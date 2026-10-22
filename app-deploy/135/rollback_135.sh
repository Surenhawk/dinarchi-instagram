#!/bin/bash
# Puts the live build back to 134 (the 19 new webp stay, ~85 KB, unused by 134).
set -euo pipefail
APP=/home/sureno_hm/dinarchiAI; RB=/home/LEGION/rollback_135
sudo cp $RB/webapp.py $APP/; sudo cp $RB/static/app.js $RB/static/index.html $APP/static/
sudo chown sureno_hm:sureno_hm $APP/webapp.py $APP/static/app.js $APP/static/index.html
sudo systemctl restart dinarchi-web; sleep 3
echo "service: $(systemctl is-active dinarchi-web)"; curl -s 127.0.0.1:8077/api/build; echo
