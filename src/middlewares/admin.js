const helper = require('../helpers/help')
exports.admin = (req, res, next) => {
    if (req.users.role != '0') {
        return helper.response('warning', res, null, 401, 'only admins have access')
    }
    next()
}