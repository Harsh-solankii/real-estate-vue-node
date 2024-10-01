'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class job_tasks_table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      job_tasks_table.belongsTo(models.prop_job_table,{foreignKey:"jobid",onDelete:"CASCADE",onUpdate:"CASCADE"})
    }
  }
  job_tasks_table.init({
    jobid: DataTypes.INTEGER,
    task_title: DataTypes.TEXT,
    task_desc: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'job_tasks_table',
  });
  return job_tasks_table;
};