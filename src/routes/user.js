'use strict'
const router = require('express').Router()
const user = require('../controllers/user')
const {isAdmin,isLogin} = require('../middlewares/permissions')


router.route('/')
.get(isAdmin,user.list)
.post(isLogin,user.create)

router.route('/:id')
.get(isLogin,user.read)
.put(isLogin,user.update)
.patch(isLogin,user.update)
.delete(isAdmin,user.delete)

module.exports = router