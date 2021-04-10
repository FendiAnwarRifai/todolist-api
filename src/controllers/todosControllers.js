const express = require('express')
const model = require('../models/index')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const helper = require('../helpers/help')
const fs = require('fs')

const todos = {
    view: (req, res) => { 
        model.todos.findAll({ where: { user_id: req.users.userId } })
            .then((result) => {
                return helper.response('success', res, result, 200, 'all data labels')
            })
    },
    create: (req, res) => { 
        const data = req.body
        model.labels.findAll({ where: { id: data.label_id } })
            .then((result) => {
                if (result.length == 0) {
                    return helper.response('warning', res, null, 401, 'label not found')
                }
                data.user_id = req.users.userId
                data.completed = false
                model.todos.create(data)
                    .then((result2) => {
                        return helper.response('success', res, result2, 200, 'created successfully')
                    })
                    .catch((err) => {
                        return helper.response('error', res, null, 401, err)
                    })
            })
    },
    update: (req, res) => { 
        const data = req.body
        model.labels.findAll({ where: { id: data.label_id } })
            .then((result) => {
                if (result.length == 0) {
                    return helper.response('warning', res, null, 401, 'label not found')
                }
                data.user_id = req.users.userId
                data.completed = false
                model.todos.update(data, {
                    where: {
                        id: data.id
                    }
                })
                    .then((result2) => {
                        if (result2[0] === 0) {
                            return helper.response('warning', res, null, 401, 'Id todos Not Found')
                        }
                        return helper.response('success', res, result2[0], 200, 'updated successfully')
                    })
                    .catch((err) => {
                        return helper.response('error', res, null, 401, err)
                    })
            })
    },
    delete: (req, res) => { 
        const todosId = req.params.id
        model.todos.destroy({
            where: {
                id: todosId
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
    delSelected: (req, res) => {
        const data = req.body.id.split(',')
        model.todos.destroy({
            where: {
                id: {
                    [Op.or]: data
                }
            }
        }).then((result) => {
            if (result === 0) {
                return helper.response('success', res, null, 200, 'Id Not Found')
            }
            return helper.response('success', res, result, 200, 'data deleted successfully')
        })
            .catch((err) => {
                return helper.response('error', res, null, 401, err)
            })
    },
    completeSelected: (req, res) => {
        const data = req.body.id.split(',')
        model.todos.update({completed: true}, {
            where: {
                id: {
                    [Op.or]: data
                }
            }
        }).then((result) => {
            if (result[0] === 0) {
                return helper.response('success', res, null, 200, 'Id Not Found')
            }
            return helper.response('success', res, result[0], 200, 'set completed successfully')
        })
            .catch((err) => {
                return helper.response('error', res, null, 401, err)
            })
    }
}
module.exports = todos