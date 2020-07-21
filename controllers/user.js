const sec_user = require('../models/sec_user');
const STATUS = require('../enums/status.enums');

exports.findAll = async function (req, res) {
  const model_user = sec_user();
  var users = await model_user.findAll();

  res.json({ data: users });
};

exports.findOne = async function (req, res) {
  const model_user = sec_user();
  var user = await model_user.findOne({
    where: { id: req.params.id }
  });

  res.json({ data: user });
};

exports.delete = async function (req, res) {
  const model_user = sec_user();
  var user = await model_user.update(
    {
      status: STATUS.DELETED
    },
    { where: { id: req.params.id } }
  );

  res.json({ message: 'Data berhasil dihapus' });
};
