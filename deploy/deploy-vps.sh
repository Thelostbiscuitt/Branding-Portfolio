#!/usr/bin/env bash
set -euo pipefail

target=${1:?"Usage: ./deploy/deploy-vps.sh user@vps-host"}
release_id=$(date -u +%Y%m%d%H%M%S)
remote_root=/var/www/habibcore
remote_release="$remote_root/releases/$release_id"

npm run build
node --check deploy/contact-service.mjs

ssh "$target" "install -d '$remote_release/deploy'"
rsync -az --delete out/ "$target:$remote_release/out/"
rsync -az deploy/contact-service.mjs deploy/ecosystem.config.cjs "$target:$remote_release/deploy/"

ssh "$target" "ln -sfn '$remote_release' '$remote_root/current' && \
  (pm2 reload habibcore-contact --update-env || pm2 start '$remote_root/current/deploy/ecosystem.config.cjs') && \
  pm2 save && test \"\$(curl --silent --output /dev/null --write-out '%{http_code}' -X GET http://127.0.0.1:3001/api/contact)\" = 405"

printf 'Deployed release %s to %s\n' "$release_id" "$target"
