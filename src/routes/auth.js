"use strict"
/* ______ Authentication Router ________ */
const router = require('express').Router()
const auth = require('../controllers/auth')
/* ______________________________________ */
// URL: /auth
router.post('/login', auth.login)
router.get('/logout', auth.logout)
/* ______________________________________ */
module.exports = router