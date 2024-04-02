"use strict"
const router = require('express').Router()

// auth:
router.use('/auth', require('./auth'))
// user:
router.use('/users', require('./user'))
// token:
router.use('/tokens', require('./token'))


// order:
router.use('/reservations', require('./reservation'))
// pizza:
router.use('/cars', require('./car'))

// document:
// router.use('/documents', require('./document'))

/* ------------------------------------------------------- */
module.exports = router