'use strict'
/* __________________ Reservation Router __________________ */
const router = require('express').Router()
const {list,create,read,update,delete:deleteReserv} = require('../controllers/reservation')
const {isAdmin,isLogin,isStaff} = require('../middlewares/permissions')

router.route('/')
.get(isLogin,list)
.post(isLogin,create)

router.route('/:id')
.get(isLogin,read)
.put(isStaff,update)
.patch(isStaff,update)
.delete(isAdmin,deleteReserv)


module.exports = router