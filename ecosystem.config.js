const { env } = process;
const { name, repository } = require('./package.json');
const host = env.DEPLOY_HOST ? env.DEPLOY_HOST.trim() : '';
const user = env.DEPLOY_USER ? env.DEPLOY_USER.trim() : '';
const path = env.DEPLOY_PATH ? env.DEPLOY_PATH.trim() : '';
const repo = repository.url.replace('git+ssh://', '');

console.log(env);

module.exports = {
  apps: [
    {
      name, //todo: need toggling logic: sfh-api-prod or sfh-api-dev for pm2 name
      script: 'http.js',
      // instances: 4,
      // exec_mode: 'cluster',
      exec_interpreter: 'node',
      autorestart: true,
      max_memory_restart: '1G',
      merge_logs: true,
      error_file: './log/pm2.err',
      out_file: './log/pm2.out',
      log_file: './log/pm2.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      pid_file: './pm2.pid',
      env: {
        PORT: 30200,
        NODE_ENV: 'development'
      },
      env_production: {
        PORT: 30100,
        NODE_ENV: 'production'
      }
    }
  ],
  deploy: {
    development: {
      user,
      host,
      repo,
      path,
      ref: 'origin/dev',
      ssh_options: 'StrictHostKeyChecking=no',
      'post-deploy': `mv ~/.env . && git pull && npm install && pm2 startOrRestart ecosystem.config.js --env development && pm2 save`
    },
    production: {
      user,
      host,
      repo,
      path,
      ref: 'origin/master',
      ssh_options: 'StrictHostKeyChecking=no',
      'post-deploy':
        'mv ~/.env . && git pull && npm install && pm2 startOrRestart ecosystem.config.js --env production && pm2 save'
    }
  }
};
