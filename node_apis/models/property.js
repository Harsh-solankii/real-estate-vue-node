'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      property.hasOne(models.prop_job_table, { foreignKey: 'prop_id',onDelete:"CASCADE", onUpdate:"CASCADE" });
      property.belongsTo(models.User,{foreignKey:"userid",onDelete:"CASCADE", onUpdate:"CASCADE"})
    }
  }
  property.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    userid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'property',
  });
  return property;
};