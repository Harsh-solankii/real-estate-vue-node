'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class estimates extends Model {
    
    static associate(models) {
      estimates.belongsTo(models.prop_job_table, { foreignKey: 'jobid',onDelete:"CASCADE", onUpdate:"CASCADE" });
    }
  }
  estimates.init({
    jobid: DataTypes.INTEGER,
    estimates: DataTypes.STRING,
    con_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'estimates',
    paranoid:true
  });
  return estimates;
};