const express = require('express')
const router = express.Router()
const controller = require('../controller/index-controller')
const { requireAuth } = require('../middleware/authMiddleware')

router.get('/dashboard', requireAuth, (req, res) => {res.render('pages/dashboard')})

module.exports = router