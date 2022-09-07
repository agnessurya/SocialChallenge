'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Challenge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Challenge.belongsTo(models.User, { foreignKey: "userId" });
      Challenge.hasMany(models.Reward, { foreignKey: "challengeId"})
    }
  }
  Challenge.init({
    title: DataTypes.STRING,
    brief: DataTypes.TEXT,
    budget: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Challenge',
  });
  return Challenge;
};