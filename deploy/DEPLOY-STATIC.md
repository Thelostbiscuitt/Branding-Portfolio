# DEPLOY-STATIC.md — put the v3.3 PORT live on habibcore.com
The build is pure static (hash routing): upload the contents of `deploy/site/`
and point the web server at it. No Node, no build step, no server config.

```
deploy/site/
├── index.html            (the whole site — 24 routes, ~380 KB)
├── 404.html              (ink 404 → /#/)
├── leadway-pitch.html    (live pitch artifact, linked from the Leadway case)
├── ai-training-hub.html  (web hub artifact, linked from the Training case)
└── media/                (11 images · 7 artworks · 2 films · 6 audio masters)
```

---
## Option A — the VPS you already run (nginx + pm2 → static swap)

```bash
# 1. upload the folder (from your machine)
scp -r deploy/site/* user@YOUR_VPS_IP:/tmp/habibcore-static/

# 2. on the VPS: install it and swap nginx over
sudo rm -rf /var/www/habibcore-static
sudo mv /tmp/habibcore-static /var/www/habibcore-static
sudo chown -R www-data:www-data /var/www/habibcore-static

sudo cp /path/to/deploy/nginx-habibcore-static.conf /etc/nginx/sites-available/habibcore
sudo ln -sf /etc/nginx/sites-available/habibcore /etc/nginx/sites-enabled/habibcore
sudo nginx -t && sudo systemctl reload nginx

# 3. stop the old Next.js app (optional — keep it a while as a fallback)
pm2 stop habibcore && pm2 save
```
HTTPS (certbot) is unchanged if you already have it — the certificate covers
the domain, not the app. Re-run `sudo certbot --nginx -d habibcore.com` only if
certificates were removed.

## Option B — cPanel / any static host
Upload the contents of `deploy/site/` into `public_html/`. Done. The 404 rule
is honoured by cPanel's default error-document settings (`404.html` is already
named correctly).

## Option C — Vercel (static)
```bash
npm i -g vercel && vercel deploy deploy/site --prod
```
Point the habibcore.com domain at the Vercel project (Domain settings → add
domain → follow the DNS instructions).

---
## Verify after deploy (2 minutes)
1. Open https://habibcore.com/ — cover loads, mark assembles.
2. Play a track (click **Sound on**, then a track row) — audio must be audible.
3. Visit `/#/work/bedroom-recordings-ii` and `/#/work/singles-cover-art` — the
   new graphic-design cases, cassette + cover series, promo film playing.
4. `/#/work/leadway-pensure` — CSW film figure below the hero.
5. Any bad URL → ink 404 → "RETURN TO HOME".

**Rollback:** the old Next.js app stays in `/var/www/habibcore` (pm2 stopped).
Re-enable with `pm2 start habibcore` and re-point nginx at the proxy config.
