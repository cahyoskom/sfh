const moment = require("moment");
const roles = require("./roles");
const sec_token = require("../models/sec_token");
const sec_user = require("../models/sec_user");
const m_param = require("../models/m_param");
const urlAndMethodMapping = {
  "/": "*",
  "/login": "POST",
  "/login_google": "POST",
  "/check_token/[a-f0-9]{32}": "GET",
  "/forgot_password": "POST",
  "/update_password/[a-f0-9]{32}": "POST",
  "/activating/[a-f0-9]{32}": "GET",
  "/request_activation": "POST",
  "/registration": "PUT",
  "/confirmation": "GET",
};

module.exports = async (req, res, next) => {
  // return next();
  const url = req._parsedUrl.pathname;

  for (let pattern in urlAndMethodMapping) {
    let method = urlAndMethodMapping[pattern];
    let postfix = pattern === "/" ? "$" : "/?$";
    let regex = new RegExp("^" + pattern + postfix, "gi");
    let matchUrl = url.match(regex) ? true : false;
    let matchMethod = method === "*" ? true : method === req.method;

    if (matchUrl && matchMethod) return next();
  }

  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Token not found!" });
  }

  let split = req.headers.authorization.split("Bearer");
  if (!split[1]) {
    return res
      .status(401)
      .send({ message: "Invalid authorization Bearer token" });
  }

  let sent_token = split[1].trim();
  var token = await sec_token().findOne({
    where: { token: sent_token },
  });

  if (!token) {
    return res.status(401).send({ message: "Token not found!" });
  }

  var now = moment();
  var expiry_date = moment(token.valid_until);
  isValid = now.isBefore(expiry_date);
  if (!isValid) {
    return res.status(401).send({ message: "Token already invalid" });
  }

  var user = await sec_user().findOne({
    where: { id: token.sec_user_id },
  });

  if (!user) {
    return res.status(401).send({ message: "User not found!" });
  }

  req.user = user;

  // extend token
  const parameter = m_param();
  const TOKEN_VALIDITY = await parameter.findOne({
    attributes: ["value"],
    where: { name: "TOKEN_VALIDITY" },
  });
  token.updated_date = now.format();
  token.updated_by = user.email;
  token.valid_until = now.add(TOKEN_VALIDITY.value, "hours").format();
  await token.save();

  return next();
};
