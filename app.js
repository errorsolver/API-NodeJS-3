const express = require('express')
// const Sequelize = require('sequelize')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')

const db = require('./config/model/index-model')
const usersRoutes = require('./routes/users')

const app = new express()

app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use('/users', usersRoutes)

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.status(200).json('Hai')
})

module.exports = app