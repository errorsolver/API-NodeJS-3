const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const db = require('./config/model/index-model')
const usersRoutes = require('./routes/users')
const otherRoutes = require('./routes/other')
const { requireAuth, checkUser } = require('./middleware/authMiddleware')

const app = new express()

// app.set('views', 'views');
app.set('view engine', 'ejs')

app.use(helmet())
app.use(express.json())
app.use(express.static('default'))
app.use(cookieParser())
app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "script-src 'self' 'unsafe-inline'");
    next();
});

app.get('*', checkUser)

app.use('', otherRoutes)
app.use('/users', usersRoutes)

app.get('/', (req, res) => {res.status(200).json('Hai')})

module.exports = app