'use strict'
/* __________________ User Router __________________ */
const router = require('express').Router()
const {list, create, read, update, delete:deleteUser} = require('../controllers/user')
const {isAdmin,isLogin,isStaff} = require('../middlewares/permissions')

// url: /users

router.route('/')
.get(isStaff,list)
.post(create)

router.route('/:id')
.get(isLogin,read)
.put(isLogin,update)
.patch(isLogin,update)
.delete(isAdmin,deleteUser)

module.exports = router