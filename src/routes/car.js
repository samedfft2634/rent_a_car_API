'use strict'
const router = require('express').Router()
const {list,create,read,update,delete:deleteCar} = require('../controllers/car')
const {isAdmin,isStaff} = require('../middlewares/permissions')

router.route('/')
.get( list) // Everyone can list.
.post(isAdmin, create)

router.route('/:id')
.get( read)
.put(isStaff, update)
.patch(isStaff, update)
.delete(isAdmin, deleteCar)

module.exports = router