const express = require('express')
const model = require('../models/index')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const helper = require('../helpers/help')
const fs = require('fs')

const users = {
    view: (req, res) => {
        model.users.findAll({
            where: {
                [Op.not]: { id: req.users.userId }
            }
        }).then((result)=>{
            return helper.response('success', res, result, 200, 'all data users')
        })
    },
    confirmed: (req, res) => {
        const data = req.body
        model.users.update(data, {
            where: {
                id: data.userId
            }
        }).then(result => {
            if (result[0] === 0) {
                return helper.response('warning', res, null, 401, 'Id Not Found')
            }
            return helper.response('success', res, result[0], 200, 'account confirmed successfully')
        })
            .catch((err) => {
                return helper.response('error', res, null, 401, err)
            })
    },
    update: (req, res) => {
        const data = req.body
        model.users.update(data, {
            where: {
                id: data.userId
            }
        }).then(result => {
            if (result[0] === 0) {
                return helper.response('warning', res, null, 401, 'Id Not Found')
            }
            return helper.response('success', res, result[0], 200, 'update successfully')
        })
            .catch((err) => {
                return helper.response('error', res, null, 401, err)
            })
    },
    delete: (req, res) => {
        const userId = req.params.id
        model.users.destroy({
            where: {
                id: userId
            }
        })
            .then((result) => {
                if (result === 0) {
                    return helper.response('success', res, null, 200, 'Id Not Found')
                }
                return helper.response('success', res, result, 200, 'data deleted successfully')
            })
            .catch((err) => {
                return helper.response('error', res, null, 401, err)
            })
    }
}
module.exports = users