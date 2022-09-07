'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Submission.belongsTo(models.Challenge, { foreignKey: "challengeId" });
      Submission.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Submission.init({
    title: DataTypes.STRING,
    url: DataTypes.TEXT,
    reward: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    views: DataTypes.INTEGER,
    challengeId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Submission',
  });
  return Submission;
};