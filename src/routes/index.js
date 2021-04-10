const express = require('express')
const router = express.Router()

const routerAuth = require('./auth')
const routerUsers = require('./users')
const routerLabels = require('./labels')
const routeTodos = require('./todos')

router.use('/auth', routerAuth)
router.use('/users', routerUsers)
router.use('/labels', routerLabels)
router.use('/todos', routeTodos)
module.exports = router