const express = require('express')
const usersRoutes = require('./routes/users')
const Sequelize = require('sequelize')

const db = require('./config/model/index-model')

const app = new express()

app.use(express.json())
app.use('/users', usersRoutes)

app.get('/', (req, res) => {
    res.status(200).json('Hai')
})

module.exports = app