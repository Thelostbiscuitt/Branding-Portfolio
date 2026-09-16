# VPS deployment — Habibcore portfolio (Next.js + pm2 + nginx)

Tested target: any Ubuntu/Debian VPS with Node 20+ and the DNS of your
domain pointed at the server's IP.

## 1. Server prep (once)

```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs nginx git
sudo npm install -g pm2
```

## 2. Get the code + build

```bash
sudo mkdir -p /var/www && sudo chown $USER /var/www
git clone https://github.com/Thelostbiscuitt/Branding-Portfolio /var/www/habibcore
cd /var/www/habibcore
npm ci
npm run build
```

> The contact form needs `RESEND_API_KEY`. Create `.env.local` in the repo root:
> `echo 'RESEND_API_KEY=re_xxxxxxxxxxxx' > .env.local`
> (`next start` reads `.env.local` automatically.)

## 3. Run it under pm2

```bash
cd /var/www/habibcore
pm2 start deploy/ecosystem.config.js
pm2 save
pm2 startup systemd -u $USER --hp $USER   # run the command it prints
curl -s http://127.0.0.1:3000 -o /dev/null -w '%{http_code}\n'   # expect 200
```

## 4. nginx in front

```bash
sudo cp /var/www/habibcore/deploy/nginx-habibcore.conf /etc/nginx/sites-available/habibcore
# edit server_name in the copy if the domain differs
sudo ln -s /etc/nginx/sites-available/habibcore /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

HTTPS:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d habibcore.com -d www.habibcore.com
```

## 5. Verify

- `curl -sI https://habibcore.com | head -1` → `HTTP/2 200`
- Open the site in a browser: preloader counter, hero, Range graph, contact form.

## 6. Redeploying after changes

```bash
cd /var/www/habibcore && git pull && npm ci && npm run build && pm2 restart habibcore
```

## Troubleshooting

- `pm2 logs habibcore` — app logs (also `/var/log/habibcore.*.log`)
- Port 3000 busy: `PORT=3100` in `deploy/ecosystem.config.js` env + update nginx `proxy_pass`
- 502 from nginx: app not running → `pm2 status`
