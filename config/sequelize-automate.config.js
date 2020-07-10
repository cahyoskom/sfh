module.exports = {
  dbOptions: require('./db.config'),
  options: {
    type: 'js',
    dir: 'models/' + new Date().getTime()
  }
};
