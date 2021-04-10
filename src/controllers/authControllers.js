const express = require('express')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const model = require('../models/index')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const helper = require('../helpers/help')
const fs = require('fs')

const auth = {
    register: (req, res) => {
        let data = req.body

        data = JSON.parse(JSON.stringify(data))
        model.users.findAll({ where: { username: data.username } })
            .then((result) => {
                if (result.length > 0) {
                    return helper.response('warning', res, null, 200, 'username is already in use')
                }
                // data.id = uuidv4()
                data.role = '1'
                data.confirmed = false
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(data.password, salt, function (err, hash) {
                        data.password = hash
                        model.users.create(data)
                            .then((result) => {
                                return helper.response('success', res, result, 200, 'account created successfully')
                            })
                            .catch((err) => {
                                return helper.response('error', res, null, 401, err)
                            })
                    })
                })
            })

    },
    login: (req, res) => {
        const { username, password } = req.body
        model.users.findAll({ where: { username: username } })
            .then((result) => {
                
                let user = result[0]
                if (user.confirmed === false) {
                    return helper.response('warning', res, null, 401, 'the account has not been confirmed by the admin')
                }
                bcrypt.compare(password, user.password, function (err, resCek) {
                    if (!resCek) {
                        return helper.response('warning', res, null, 401, 'password wrong')
                    }
                    delete user.dataValues.password
                    jwt.sign({ userId: user.id, role: user.role }, process.env.SECRET_KEY, { expiresIn: 3600 }, function (err, token) {
                        user.dataValues.token = token
                        user.dataValues.expiredToken = 3600000
                        return helper.response('success', res, user, 200, 'login success')
                    })

                })
            })
            .catch((err) => {
                helper.response('error', res, err, 401, 'username is not specified')
            })
    }
}
module.exports = auth