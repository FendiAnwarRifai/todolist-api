const express = require('express')
const model = require('../models/index')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const helper = require('../helpers/help')
const fs = require('fs')

const labels = {
    view: (req, res) => {
        sort = req.query.sortbydesc || 'DESC'
        const perPage = parseInt(req.query.per_page)
        let currentPages = (req.query.page - 1) * perPage
        model.labels.findAll({
            where: {
                [Op.or]: [
                    { label: { [Op.like]: `%${req.query.q}%` } },
                    { desc: { [Op.like]: `%${req.query.q}%` } }
                ]
            },
            offset: currentPages, limit: perPage,
            order: [[req.query.sortby, sort]]

        }).then((result) => {
            model.labels.findAll({
                where: {
                    [Op.or]: [
                        { label: { [Op.like]: `%${req.query.q}%` } },
                        { desc: { [Op.like]: `%${req.query.q}%` } }
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
    create: (req, res) => {
        const data = req.body
        model.labels.findAll({ where: { label: data.label } })
            .then((result) => {
                if (result.length > 0) {
                    return helper.response('warning', res, null, 200, 'the label already exists')
                }
                model.labels.create(data)
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
        model.labels.update(data, {
            where: {
                id: data.id
            }
        }).then(result2 => {
            if (result2[0] === 0) {
                return helper.response('warning', res, null, 401, 'Id Not Found')
            }
            return helper.response('success', res, result2[0], 200, 'update successfully')
        })
            .catch((err) => {
                return helper.response('error', res, null, 401, err)
            })
    },
    delete: (req, res) => {
        const labelsId = req.params.id
        model.labels.destroy({
            where: {
                id: labelsId
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
module.exports = labels