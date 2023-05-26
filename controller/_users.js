const model = require('../config/model/index-model')

const controller = {}

controller.getAll = async function (req, res) {
    try {
        let users = await model.users.findAll({
            attributes: [['username', 'name'], ['password', 'pass']]
        })
        if (users.length > 0) {
            res.status(200).json({
                message: 'Success Get Users',
                data: users
            })
        } else {
            res.status(200).json({
                message: 'Users Not Found',
                data: []
            })
        }
    } catch (err) {
        res.status(404).json({
            error: err.message
        })
    }
}

controller.insertUser = async function (req, res) {
    let username = req.body.username
    let password = req.body.password
    try {
        let user = await model.users.create({
            username, password
        })
        res.status(200).json({
            message: 'User added to database',
            data: user
        })
    } catch (err) {
        res.status(200).json({
            error: err.message
        })
    }
    
}

module.exports = controller