const express = require('express')
const router = express.Router()
const { verifyAccess } = require('../middlewares/auth')
const todosController = require('../controllers/todosControllers')

router
    .get('/', verifyAccess, todosController.view)
    .post('/create', verifyAccess, todosController.create)
    .patch('/update', verifyAccess, todosController.update)
    .delete('/delete/:id', verifyAccess, todosController.delete)
    .post('/delSelected', verifyAccess, todosController.delSelected)
    .post('/completeSelected', verifyAccess, todosController.completeSelected)


module.exports = router