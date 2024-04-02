'use strict'
const router = require('express').Router()
const car = require('../controllers/car')
const {isAdmin,isLogin} = require('../middlewares/permissions')

router.route('/')
.get(isLogin,car.list)
.post(isAdmin,car.create)

router.route('/:id')
.get(isAdmin,car.read)
.put(isAdmin,car.update)
.patch(isAdmin,car.update)
.delete(isAdmin,car.delete)

module.exports = router