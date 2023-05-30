const { Sequelize } = require('sequelize')
const jwt = require('jsonwebtoken')

const db = require('../config/database/db')
const model = require('../config/model/index-model')

const usersController = {}

const errorHandler = (err)=>{
    console.log('err message & code: ',err.message, err.code);
    let errors = {email: '', password: ''}

    if(err.message === 'Incorrect email'){
        errors.email = 'Email not registered' 
    }

    if(err.message === 'Incorrect password'){
        errors.email = 'Password is incorrect' 
    }

    if(err.code == 11000) {
        errors.email = 'Email already registered'
        return errors
    }

    if(err.message.includes('user validation failed')) {
        Object.values(err.error).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

function getUser(username) {
    return model.Username.findOne({
        where: { username }
    })
}
function getPass(id) {
    return model.Password.findOne({
        where: { uuid: id }
    })
}

async function login(username, password) {
    const user = await getUser(username)
    const pass = await getPass(user.uuid)
    // if (!user) throw 'Username does not exist';
    if (user === null) {throw 'Incorrect email'}
    if (pass.hashed_password == password){
        return user
    } else throw 'Incorrect password';
}

const maxAge = 3 * 60 * 60 // second
const passcode = process.env.PASSCODE
const createToken = (id) => {
    return jwt.sign({ id }, passcode, {
        expiresIn: maxAge
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
        const result = await db.transaction(async function () {
            await model.Username.create({ username })

            const uuid = await getUser(username)
            if (!uuid) { throw Error("System error to input user and password") }

            let id = uuid.uuid
            await model.Password.create({ uuid: id, hashed_password })

            const token = createToken(id)
            res.cookie('_jwt', token, {
                httpOnly: true,
                maxAge: maxAge * 1000 // millisecond
            })
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

usersController.login = async function (req, res) {
    const { username, password } = req.body
    try {
        const user = await login(username, password)
        const token = createToken(user.uuid)
        res.cookie('_jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000 // millisecond
        })
        res.status(200).json({
            'message': 'login success',
            'data': user.uuid
        })
    } catch (err) {
        const errors = errorHandler(err)
        res.status(404).json({
            'loc': 'usersController(login)',
            'highlight': errors,
            'error': err
        })
    }
}

usersController.logout_get = async function(req, res) {
    res.cookie('_jwt', '', {maxAge: 1})
    res.redirect('/')
}

module.exports = usersController