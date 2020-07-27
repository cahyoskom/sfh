const { env } = process;
const { name, repository } = require('./package.json');
const host = env.DEPLOY_HOST ? env.DEPLOY_HOST.trim() : '';
const user = env.DEPLOY_USER ? env.DEPLOY_USER.trim() : '';
const path = `/home/${user}/${name}`;
const repo = repository.url.replace('git+ssh://', '');

console.log(env);
console.log({ user, host, path, repo });

module.exports = {
  apps: [
    {
      name,
      script: 'index.js',
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
      path,
      repo,
      ref: 'origin/dev',
      ssh_options: 'StrictHostKeyChecking=no',
      'post-deploy':
        'npm install && pm2 startOrRestart ecosystem.config.js --env development && pm2 save'
    },
    production: {
      user,
      host,
      path,
      repo,
      ref: 'origin/master',
      ssh_options: 'StrictHostKeyChecking=no',
      'post-deploy':
        'npm install && pm2 startOrRestart ecosystem.config.js --env production && pm2 save'
    }
  }
};
