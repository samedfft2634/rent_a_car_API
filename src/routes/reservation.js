'use strict'
/* __________________ Reservation Router __________________ */
const router = require('express').Router()
const reservation = require('../controllers/reservation')
const {isAdmin,isLogin} = require('../middlewares/permissions')

router.route('/')
.get(isLogin,reservation.list)
.post(isLogin,reservation.create)

router.route('/:id')
.get(isLogin,reservation.read)
.put(isAdmin,reservation.update)
.patch(isAdmin,reservation.update)
.delete(isAdmin,reservation.delete)

// /reservations/users/:id
router.route('/users/:id',reservation.listreservs)

module.exports = router