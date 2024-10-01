'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Channels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Channels.init({
    jobid: DataTypes.INTEGER,
    user1: DataTypes.INTEGER,
    user2: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Channels',
  });
  return Channels;
};