const express = require('express')
const router = express.Router()
// const db = require('../config/database/db')
const controller = require('../controller/index-controller')
const { requireAuth } = require('../middleware/authMiddleware')

router.get('/signup', (req, res) => {res.render('pages/signup')})
router.post('/signup', controller.users.insertUser)
router.get('/login', (req, res) => {res.render('pages/login')})
router.post('/login', controller.users.login)
router.get('/getAll', requireAuth, controller.users.getAll)
router.get('/logout', controller.users.logout_get)

// router.get('/', (req, res, next) => {
//     let sql = 'select * from users'
//     db.query(sql, (err, result) => {
//         if(err) throw err
//         res.status(200).json({
//             message: 'success get all users',
//             data: result
//         })
//     })
// })

module.exports = router