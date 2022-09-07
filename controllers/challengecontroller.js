const { Challenge, Reward } = require("../models");

class ChallengeController {
  static async postChallenges(req, res, next) {
    try {
      const { title, brief, budget } = req.body;
      const userId = req.user.id;
      const role = req.user.role;
      if (role !== "Initiator") {
        throw { name: "NotInitiator" };
      }
      if (budget < 50000) {
        throw { name: "MinimumBudget" };
      }
      const challenge = await Challenge.create({
        title,
        brief,
        budget,
        userId,
      });
      if (challenge.id) {
        res
          .status(200)
          .json({ message: "Challenge created with id: " + challenge.id });
      }
    } catch (err) {
      next(err);
    }
  }
  static async getChallenges(req, res, next) {
    try {
      const challenge = await Challenge.findAll({
        include: [
          {
            model: Reward,
            attributes: ["tier", "maxSub", "subCount", "reward"],
          },
        ],
      });
      res.status(200).json(challenge);
    } catch (err) {
      next(err);
    }
  }
  static async getDetailChallenge(req, res, next) {
    try {
      const challenge = await Challenge.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!challenge) {
        throw { name: "DataNotFound" };
      }
      res.status(200).json(challenge);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ChallengeController;
