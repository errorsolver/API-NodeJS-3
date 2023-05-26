const sq = require('sequelize')
const db = require('../config/database/db')
const model = require('../config/model/index-model')

const controller = {}

controller.getAll = async function (req, res) {
    try {
        let users = await model.Username.findAll({
            attributes: [
                ['username', 'name']
            ]
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
            loc: 'usersController(getAll)',
            error: err.message
        })
    }
}

controller.insertUser = async function (req, res) {
    const username = req.body.username
    const hashed_password = req.body.password
    try {
        const result = await db.transaction(async (t) => {
            const usernames = await model.Username.create({username})

            const uuid = await model.Username.findOne({
                where: { username: username }
            })
            if (!uuid) { return null}
            // console.log('uuid = ', uuid);

            let UUID = uuid.uuid
            const passwords = await model.Password.create({uuid: UUID ,hashed_password})
            
            return username, passwords
        })
        res.status(200).json({
            message: 'User added to database',
            data: result
        })
    } catch (err) {
        res.status(404).json({
            loc: 'usersController(insertUser)',
            error: err.original
        })
    }
    
}

module.exports = controller