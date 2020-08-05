const sec_user = require("../models/sec_user");
const moment = require("moment");
const isBase64 = require("is-base64");

exports.findOne = async function (req, res) {
  const model_user = sec_user();
  var user = await model_user.findOne({
    where: { id: req.params.id },
  });

  res.json({ data: user });
};

exports.getProfile = async function (req, res) {
  const usernya = req.user;
  const model = usernya.dataValues;

  console.log(usernya);
  console.log("batas----------------------------------------------------");
  console.log(model);

  const model_user = sec_user();
  var user = await model_user.findAll({
    attributes: ["name", "email", "phone", "avatar"],
    where: { id: req.user.dataValues.id },
  });

  res.json({ data: user });
};

exports.update = async function (req, res) {
  const model_user = sec_user();
  var checkAvatar = isBase64(req.body.avatar, { allowMime: true });
  if (!checkAvatar) {
    res
      .status(401)
      .json({ error: null, message: "Format gambar tidak sesuai" });
  }

  var update_obj = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    avatar: req.body.avatar,
  };
  try {
    var datum = await model_user.update(update_obj, {
      where: { id: req.user.dataValues.id },
    });
    res.json({ message: "Data has been updated." });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};
