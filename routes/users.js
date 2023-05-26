const express = require('express')
const router = express.Router()
const db = require('../config/database/db')
const controller = require('../controller/index-controller')

router.get('/', controller.users.getAll)
router.post('/', controller.users.insertUser)

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