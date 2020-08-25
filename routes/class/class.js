const cls = require('../../controllers/class');

module.exports = function (router) {
  router.get('/', cls.findAll);
  router.get('/:id', cls.findOne);
  router.post('/:id', cls.update);
  router.put('/', cls.create);
  router.delete('/:id', cls.delete);
  router.put('/join', cls.join);
  router.put('/duplicate/:id', cls.duplicate);
  router.get('/member/:id', cls.member);
  router.post('/link-update/:id', cls.classMemberLinkStatus);
  router.post('/add-member/:id', cls.inviteMember);
};
