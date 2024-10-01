'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pow_task_images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      pow_task_images.belongsTo(models.job_tasks_table,{foreignKey:"taskid",onDelete:"CASCADE",onUpdate:"CASCADE"})

    }
  }
  pow_task_images.init({
    taskid: DataTypes.INTEGER,
    images: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'pow_task_images',
  });
  return pow_task_images;
};