const jwt = require('jsonwebtoken')

const model = require('../config/model/index-model')

const passcode = process.env.PASSCODE

const requireAuth = (req, res, next) => {
    const token = req.cookies._jwt

    if(token){
        jwt.verify(token, passcode, (err, decodedToken) => {
            if(err){
                console.log(err.message)
                res.redirect('/users/login')
            } else {
                console.log(decodedToken)
                next()
            }
        })
    } else {
        res.redirect('/users/login')
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies._jwt

    if(token){
        jwt.verify(token, passcode, async (err, decodedToken) => {
            if(err){
                console.log(err.message)
                res.locals.user = null
                next()
            } else {
                console.log(decodedToken)
                let user = await model.Username.findByPk(decodedToken.id)
                console.log('user: ',user.username)
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}

module.exports = { requireAuth, checkUser }