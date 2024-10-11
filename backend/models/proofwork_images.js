'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class proofwork_images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      proofwork_images.belongsTo(models.prop_job_table,{foreignKey:"jobid",onDelete:"CASCADE", onUpdate:"CASCADE"})
    }
  }
  proofwork_images.init({
    jobid: DataTypes.INTEGER,
    image: DataTypes.STRING,
    con_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'proofwork_images',
    paranoid:true
  });
  return proofwork_images;
};