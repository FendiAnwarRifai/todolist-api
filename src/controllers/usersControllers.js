const express = require('express')
const model = require('../models/index')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const helper = require('../helpers/help')
const fs = require('fs')

const users = {
    view: (req, res) => {
        sort = req.query.sortbydesc || 'DESC'
        const perPage = parseInt(req.query.per_page)
        let currentPages = (req.query.page - 1) * perPage
        model.users.findAll({
            where: {
                [Op.not]: { id: req.users.userId },
                [Op.or]: [
                    { name: { [Op.like]: `%${req.query.q}%` } },
                    { username: { [Op.like]: `%${req.query.q}%` } }
                ]
            },
            offset: currentPages, limit: perPage,
            order: [[req.query.sortby, sort]]

        }).then((result) => {
            model.users.findAll({
                where: {
                    [Op.not]: { id: req.users.userId },
                    [Op.or]: [
                        { name: { [Op.like]: `%${req.query.q}%` } },
                        { username: { [Op.like]: `%${req.query.q}%` } }
                    ]
                }
            }).then((result2) => {
                let to = currentPages + perPage
                if (to >= result2.length) {
                    to = result2.length
                }
                res.json({
                    from: currentPages + 1,
                    to: to,
                    currentPages: currentPages,
                    per_page: perPage,
                    result: result,
                    rows: result2.length
                })
            })
        })
            .catch((err) => {
                return helper.response('error', res, null, 401, err)
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
    },
    byLogin: (req, res) => {
        model.users.findAll({
            where: { id: req.users.userId }
        }).then((result) => {
            let user = result[0]
            delete user.dataValues.password
            return helper.response('success', res, user, 200, 'successfully')
        })
            .catch((err) => {
                return helper.response('error', res, null, 401, err)
            })
    }
}
module.exports = users