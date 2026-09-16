module.exports = {
  apps: [{
    name: 'habibcore-contact',
    script: 'contact-service.mjs',
    cwd: __dirname,
    interpreter: 'node',
    instances: 1,
    exec_mode: 'fork',
    env: { NODE_ENV: 'production', PORT: 3001 },
    max_memory_restart: '128M',
    time: true,
  }],
}
