#!/bin/bash
# Puts the live build back to 136.
set -euo pipefail
APP=/home/sureno_hm/dinarchiAI; RB=/home/LEGION/rollback_137
sudo cp $RB/webapp.py $APP/; sudo cp $RB/static/index.html $APP/static/
sudo chown sureno_hm:sureno_hm $APP/webapp.py $APP/static/index.html
sudo systemctl restart dinarchi-web; sleep 3
echo "service: $(systemctl is-active dinarchi-web)"; curl -s 127.0.0.1:8077/api/build; echo
