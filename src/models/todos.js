'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.todos.belongsTo(models.labels, {
        foreignKey: 'label_id'
      })
    }
  };
  todos.init({
    user_id: DataTypes.INTEGER,
    label_id: DataTypes.INTEGER,
    task: DataTypes.STRING,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'todos',
  });
  return todos;
};