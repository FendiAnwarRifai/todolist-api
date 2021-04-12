const express = require('express')
const router = express.Router()
const { verifyAccess } = require('../middlewares/auth')
const { admin } = require('../middlewares/admin')
const labelsController = require('../controllers/labelsControllers')

router
    .get('/', verifyAccess, admin, labelsController.view)
    .get('/view', verifyAccess, labelsController.all)
    .post('/create', verifyAccess, admin, labelsController.create)
    .patch('/update', verifyAccess, admin, labelsController.update)
    .delete('/delete/:id', verifyAccess, admin, labelsController.delete)


module.exports = router