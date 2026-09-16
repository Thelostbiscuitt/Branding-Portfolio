# HABIBCORE VPS deployment

The portfolio is a static Next export. nginx serves `out/`, including the
music files with native byte-range support. The small Node service in this
directory serves only `POST /api/contact`, reusing the validated Cloudflare
function so the form works on the VPS without exposing the Resend key.

## One-time server setup

```bash
sudo apt update
sudo apt install -y nginx nodejs npm
sudo npm install -g pm2
sudo install -d -o "$USER" -g "$USER" /var/www/habibcore/releases
sudo cp deploy/nginx-habibcore.conf /etc/nginx/sites-available/habibcore
sudo ln -s /etc/nginx/sites-available/habibcore /etc/nginx/sites-enabled/habibcore
sudo nginx -t && sudo systemctl reload nginx
```

Set the Resend key before starting the service. PM2 retains this environment
when it is saved and when the release script reloads the process.

```bash
export RESEND_API_KEY='re_…'
export CONTACT_FROM='Habib <contact@habibcore.com>'
pm2 start /var/www/habibcore/current/deploy/ecosystem.config.cjs
pm2 save
```

Use Certbot after DNS points at the VPS:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d habibcore.com -d www.habibcore.com
```

## Release

From this repository, with SSH access to the intended VPS:

```bash
./deploy/deploy-vps.sh user@vps-host
```

The script builds locally, uploads a timestamped release, atomically switches
`/var/www/habibcore/current`, reloads the contact service, and verifies it is
reachable locally. Keep the previous release directory until the public site
has been checked.
