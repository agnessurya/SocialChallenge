const { User } = require("../models");
const { maketoken } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    try {
      const { name, role } = req.body;
      const user = await User.create({ name, role });
      if (user.id) {
        res.status(201).json({
          message: "User registered with id " + user.id,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { name, role } = req.body;

      const user = await User.findOne({ where: { name, role } });
      if (!user) {
        throw { name: `UserNotFound` };
      }
      const payload = {
        id: user.id,
        name: user.name,
        role: user.role,
      };
      const access_token = maketoken(payload);
      res.status(200).json({ access_token, payload });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = UserController;
