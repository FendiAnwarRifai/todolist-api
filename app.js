require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = process.env.DB_PORT
const router = require('./src/routes/index')
const bodyParser = require('body-parser')
var cors = require('cors')
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
// routes
app.use('/api', router)

app.listen(PORT, () => console.log(`server is running port ${PORT}
http://localhost:${PORT}`))
