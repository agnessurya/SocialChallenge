const { changetopayload } = require("../helpers/jwt");
const { User } = require("../models");

const Authentikasi = async (req, res, next) => {
  try {
    const token = req.headers.access_token;
    if (!token) {
      throw { name: "JsonWebTokenError" };
    }
    const verify = changetopayload(token);

    const user = await User.findOne({
      where: {
        name: verify.name,
        id: verify.id,
        role: verify.role,
      },
    });
    if (!user) {
      throw { name: "UserNotFound" };
    }

    req.user = {
      name: user.name,
      id: user.id,
      role: user.role,
    };

    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { Authentikasi };
