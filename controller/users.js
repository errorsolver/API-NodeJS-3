const { Sequelize } = require('sequelize')
const db = require('../config/database/db')
const model = require('../config/model/index-model')

const usersController = {}

function getUser(username) {
    return model.Username.findOne({
        where: { username: username }
    })
}

usersController.getAll = async function (req, res) {
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

usersController.insertUser = async function (req, res) {
    const username = req.body.username
    const hashed_password = req.body.password
    try {
        const result = await db.transaction(async () => {
            await model.Username.create({username})

            const uuid = await getUser(username)
            if (!uuid) {throw("System error to input user and password")}

            let UUID = uuid.uuid
            await model.Password.create({uuid: UUID ,hashed_password})
            
            return `success added ${username} to database`
        })
        res.status(200).json({
            message: `User added to database`,
            data: result
        })
    } catch (err) {
        res.status(404).json({
            loc: 'usersController(insertUser)',
            error: err
        })
    }
    
}

module.exports = usersController