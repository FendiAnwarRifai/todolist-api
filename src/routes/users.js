const express = require('express')
const router = express.Router()
const { verifyAccess } = require('../middlewares/auth')
const { admin } = require('../middlewares/admin')
const usersController = require('../controllers/usersControllers')
const authController = require('../controllers/authControllers')


router
    .get('/', verifyAccess, admin, usersController.view)
    .get('/byLogin', verifyAccess, usersController.byLogin)
    .post('/create', verifyAccess, admin, authController.register)
    .post('/confirmed', verifyAccess, admin, usersController.confirmed)
    .patch('/update', verifyAccess, usersController.update)
    .delete('/delete/:id', verifyAccess, admin, usersController.delete)


module.exports = router