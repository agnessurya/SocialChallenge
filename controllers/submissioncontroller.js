const { Challenge, Submission, Reward } = require("../models");
const { maketoken } = require("../helpers/jwt");

class SubmissionController {
  static async postSubmissions(req, res, next) {
    try {
      const { challengeId } = req.params;
      const userId = req.user.id;
      const role = req.user.role;
      if (role !== "Participant") {
        throw { name: "NotParticipant" };
      }

      const check = await Submission.findOne({
        where: {
          challengeId,
          userId,
        },
      });

      if (check) {
        if (check.status === "On Review" || check.status === "Approved") {
          throw { name: "OnlyOneSub" };
        }
      }
      const { title, url } = req.body;
      const sub = await Submission.create({
        challengeId,
        userId,
        title,
        url,
        views: 0,
        status: "On Review",
      });
      if (sub.id) {
        res.status(201).json({
          message: "Succes created Submission with id " + sub.id,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async getSubmissions(req, res, next) {
    try {
      const sub = await Submission.findAll({});
      res.status(200).json(sub);
    } catch (err) {
      next(err);
    }
  }

  static async getChallengeSubmissions(req, res, next) {
    try {
      const { challengeId } = req.params;
      const sub = await Submission.findAll({
        where: {
          challengeId,
        },
      });
      if (!sub) {
        throw { name: "DataNotFound" };
      }
      res.status(201).json(sub);
    } catch (err) {
      next(err);
    }
  }

  static async getDetailSubmissions(req, res, next) {
    try {
      const { id, challengeId } = req.params;
      const sub = await Submission.findOne({
        where: {
          id,
          challengeId,
        },
      });
      if (!sub) {
        throw { name: "DataNotFound" };
      }
      res.status(201).json(sub);
    } catch (err) {
      next(err);
    }
  }

  static async statusSubmissions(req, res, next) {
    try {
      const { id } = req.params;
      const role = req.user.role;
      const { status } = req.body;
      if (role !== "Admin" && role !== "Initiator") {
        throw { name: "IsParticipant" };
      }
      const sub = await Submission.findAll({
        where: {
          id,
        },
      });
      if (!sub) {
        throw { name: "DataNotFound" };
      }
      const update = await Submission.update(
        {
          status,
        },
        { where: { id } }
      );
      if ((update[0] = 1)) {
        res.status(201).json({ message: "Success Update Submission Status" });
      }
    } catch (err) {
      next(err);
    }
  }

  static async countViews(req, res, next) {
    try {
      const { challengeId, id } = req.params;
      const response = await Submission.increment("views", {
        by: 1,
        where: { id },
      });

      const sub = await Submission.findOne({
        where: {
          id,
          challengeId,
          status: "Approved",
        },
      });
      if (!sub) {
        throw { name: "DataNotFound" };
      }
      let reward = 0;
      let status = "Approved";
      if (sub.views > 12500) {
        reward = 210000;
      } else if (sub.views < 12500 && sub.views > 10000) {
        reward = 175000;
      } else if (sub.views < 10000 && sub.views > 8000) {
        reward = 145000;
      } else if (sub.views < 8000 && sub.views > 5000) {
        reward = 110000;
      } else if (sub.views < 5000 && sub.views > 2500) {
        reward = 95000;
      } else if (sub.views < 2500 && sub.views > 500) {
        reward = 75000;
      } else if (sub.views < 500 && sub.views > 100) {
        reward = 50000;
      } else if (sub.views < 100) {
        status = "Rejected";
      }
      const update = await Submission.update(
        {
          reward,
          status,
        },
        { where: { id }, returning: true }
      );
      if (response && sub) {
        res.status(200).json({ message: "Success Update Views" });
      }
    } catch (err) {
      next(err);
    }
  }

  static async giveRewards(req, res, next) {
    try {
      const { id, challengeId } = req.params;
      const sub = await Submission.findOne({
        where: {
          id,
          challengeId,
        },
      });
      if (sub.status === "Already Gifted Rewards") {
        throw { name: "AlreadyGifted" };
      }
      if (sub.reward) {
        let minReward = sub.reward;
        let chal = await Challenge.findOne({
          where: { id: challengeId },
        });
        let rewards = await Reward.findOne({
          where: {
            reward: `${minReward}`,
            challengeId: challengeId,
          },
        });
        let updateReward = chal.budget - minReward;
        if (rewards.subCount >= rewards.maxSub) {
          throw { name: "LimitReward" };
        }
        const update = await Reward.update(
          {
            subCount: rewards.subCount + 1,
          },
          { where: { id: rewards.id } }
        );
        if ((update[0] = 1)) {
          const updateSub = await Submission.update(
            {
              status: "Already Gifted Rewards",
            },
            { where: { id } }
          );

          const updateChal = await Challenge.update(
            {
              budget: updateReward,
            },
            { where: { id: challengeId } }
          );
          if (updateSub[0] == 1 && updateChal[0] == 1) {
            res.status(201).json({ message: "Success Update Rewards" });
          }
        }
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = SubmissionController;
