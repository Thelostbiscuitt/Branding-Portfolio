// pm2 process definition — Habibcore portfolio
// usage (on the VPS, from the repo root):  pm2 start deploy/ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'habibcore',
      script: 'npm',
      args: 'start',
      cwd: __dirname + '/..',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      /* env_secret holds the Resend key — create deploy/.env with it, or
         export RESEND_API_KEY before running pm2 (see DEPLOY-VPS.md) */
      max_memory_restart: '512M',
      out_file: '/var/log/habibcore.out.log',
      error_file: '/var/log/habibcore.err.log',
      time: true,
    },
  ],
}
