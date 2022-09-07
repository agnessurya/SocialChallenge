'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reward.belongsTo(models.Challenge, { foreignKey: "challengeId" });
    }
  }
  Reward.init({
    tier: DataTypes.INTEGER,
    target: DataTypes.INTEGER,
    reward: DataTypes.STRING,
    challengeId: DataTypes.INTEGER,
    maxSub: DataTypes.INTEGER,
    subCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reward',
  });
  return Reward;
};