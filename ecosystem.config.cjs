module.exports = {
  apps: [
    {
      name: 'dolina-front',
      port: '3000',
      
      script: './.output/server/index.mjs',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        NUXT_PUBLIC_API_BASE: 'http://vps-ea2cb317.vps.ovh.net:8055'
      }
    }
  ],
}