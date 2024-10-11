'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prop_job_table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      prop_job_table.belongsTo(models.property,{foreignKey:"prop_id",onDelete:"CASCADE",onUpdate:"CASCADE"}),
      prop_job_table.hasOne(models.estimates,{foreignKey:"jobid",onDelete:"CASCADE",onUpdate:"CASCADE"})
    }
  }
  prop_job_table.init({
    prop_id: DataTypes.INTEGER,
    job_status: DataTypes.TEXT,
    job_estimate: DataTypes.INTEGER,
    job_desc:DataTypes.STRING,
    job_name:DataTypes.STRING,
    userid:DataTypes.INTEGER,
    con_id:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'prop_job_table',
  });
  return prop_job_table;
};