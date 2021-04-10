'use strict';
const bcrypt = require('bcryptjs')
const hash = bcrypt.hashSync('admin123',10)
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: 1,
      name: 'Admin',
      username: 'admin@gmail.com',
      password: hash,
      confirmed: true,
      role: '0',
      createdAt: new Date(),
      updatedAt: new Date()
    }]).catch((err)=>{
      const errorData = {
        code: err.parent.code,
        message : err.parent.sqlMessage
      }
      console.log(errorData)
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', [{
      name: 'Admin',
      username: 'admin@gmail.com',
      role: '0'
    }])
  }
};
