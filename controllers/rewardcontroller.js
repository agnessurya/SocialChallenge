const { Reward, Challenge } = require("../models");
class RewardController {
  static async postRewards(req, res, next) {
    try {
      const { challengeId } = req.params;
      const challenge = await Challenge.findOne({
        where: {
          id: challengeId,
        },
      });
      if (!challenge) {
        throw { name: "DataNotFound" };
      }
      const budget = challenge.budget;
      if (budget < 50000) {
        throw { name: "MinimumBudget" };
      }
      const divideBudget = Math.floor(+budget / 7);
      console.log(divideBudget);
      let minusBudget;
      if (divideBudget > 210000) {
        var tierSeven = Math.floor(divideBudget / 210000);
        let minusSeven = budget - tierSeven * 210000;
        minusBudget = minusSeven;
      }
      if (minusBudget > 175000 || divideBudget > 175000) {
        var tierSix =
          Math.floor(minusBudget / 175000) || Math.floor(divideBudget / 175000);
        let minusSix =
          budget - tierSix * 175000 || minusBudget - tierSix * 175000;
        minusBudget = minusSix;
      }
      if (minusBudget > 145000 || divideBudget > 145000) {
        var tierFive =
          Math.floor(minusBudget / 145000) || Math.floor(divideBudget / 145000);
        let minusSix =
          budget - tierSix * 145000 || minusBudget - tierSix * 145000;
        minusBudget = minusSix;
      }
      if (minusBudget > 110000 || divideBudget > 110000) {
        var tierFour =
          Math.floor(minusBudget / 110000) || Math.floor(divideBudget / 110000);
        let minusSix = budget - tierSix * 110000;
        minusBudget = minusSix;
      }
      if (minusBudget > 95000 || divideBudget > 95000) {
        var tierThree =
          Math.floor(minusBudget / 95000) || Math.floor(divideBudget / 95000);
        let minusSix = budget - tierSix * 95000;
        minusBudget = minusSix;
      }
      if (minusBudget > 75000 || divideBudget > 75000) {
        var tierTwo =
          Math.floor(minusBudget / 75000) || Math.floor(divideBudget / 75000);
        let minusSix = budget - tierSix * 75000;
        minusBudget = minusSix;
      }
      if (minusBudget > 50000 || divideBudget > 50000) {
        var tierOne =
          Math.floor(minusBudget / 50000) || Math.floor(divideBudget / 50000);
        let minusSix = budget - tierSix * 50000;
        minusBudget = minusSix;
      }

      const payload = [];
      if (tierSeven) {
        payload.push({
          tier: 7,
          target: 12500,
          reward: 210000,
          challengeId,
          maxSub: tierSeven,
          subCount: 0,
        });
      }
      if (tierSix) {
        payload.push({
          tier: 6,
          target: 10000,
          reward: 175000,
          challengeId,
          maxSub: tierSix,
          subCount: 0,
        });
      }
      if (tierFive) {
        payload.push({
          tier: 5,
          target: 8000,
          reward: 145000,
          challengeId,
          maxSub: tierFive,
          subCount: 0,
        });
      }
      if (tierFour) {
        payload.push({
          tier: 4,
          target: 5000,
          reward: 110000,
          challengeId,
          maxSub: tierFour,
          subCount: 0,
        });
      }
      if (tierThree) {
        payload.push({
          tier: 3,
          target: 2500,
          reward: 95000,
          challengeId,
          maxSub: tierThree,
          subCount: 0,
        });
      }
      if (tierTwo) {
        payload.push({
          tier: 2,
          target: 500,
          reward: 75000,
          challengeId,
          maxSub: tierTwo,
          subCount: 0,
        });
      }
      if (tierOne) {
        payload.push({
          tier: 1,
          target: 100,
          reward: 50000,
          challengeId,
          maxSub: tierOne,
          subCount: 0,
        });
      }
      if (payload.length > 0) {
        const reward = await Reward.bulkCreate(payload);
        res.status(200).json(reward);
      }
    } catch (err) {
      next(err);
    }
  }

  static async getRewards(req, res, next) {
    try {
      const reward = await Reward.findAll({});
      res.status(201).json(reward);
    } catch (err) {
      next(err);
    }
  }

  static async getChallengeRewards(req, res, next) {
    try {
      const reward = await Reward.findAll({
        where: {
          challengeId: req.params.challengeId,
        },
      });
      res.status(201).json(reward);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = RewardController;
