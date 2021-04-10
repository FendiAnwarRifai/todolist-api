'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      label_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'labels',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'cascade'
      },
      task: {
        type: Sequelize.STRING
      },
      completed: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      // Create Unique CompoundIndex
      let sql = `CREATE INDEX todosCompoundIndex
              ON todos
              (user_id,label_id);
            `;
      return queryInterface.sequelize.query(sql, { raw: true });
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('todos');
  }
};