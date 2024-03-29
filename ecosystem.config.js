module.exports = {
  apps : [{
    name    :  'API',
    script  : './bin/www',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    watch: true,
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }],
};
