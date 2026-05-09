module.exports = {
  apps: [
    {
      name: 'dolina-front',
      port: '3000',,
      
      script: './.output/server/index.mjs',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        NUXT_PUBLIC_API_BASE: 'http://vps-ea2cb317.vps.ovh.net:8055'
      }
    }
  ],
  deploy: {
    production: {
      user: 'debian',
      host: 'vps-ea2cb317.vps.ovh.net',
      ref: 'origin/main',
      repo: 'git@github.com:TWOJE_REPO.git',
      path: '/home/debian/apps/dolinaharmonii_frontend',
      'post-deploy': 'pnpm install && pnpm build && pm2 reload ecosystem.config.js --env production'
    }
  }
}