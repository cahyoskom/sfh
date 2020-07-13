const master = require('../../controllers/master');

module.exports = function (router) {
  /*******************
   * GET /
   * params :
   *   table => nama table
   *   <field> => filtering using
   *              ex. id=1&nama=rolis&nama=kartiko => WHERE id=1 AND nama IN ('rolis', 'kartiko')
   *
   **********************/
  router.get('/', master.preFindAll, master.findAll);

  /*******************
   * PUT /
   * params :
   *   table => nama table
   * body :
   *   {
   *     field_1 : value_1,
   *     field_2 : value_2,
   *     ...
   *     field_n : value_n,
   *    }
   **********************/

  router.put('/', master.create);

  /*******************
   * DEL /
   * params :
   *   table => nama table
   *   <field> => filtering ex. id=1
   *   delete => true for hard delete (optional)
   **********************/
  router.delete('/', master.delete);
};
