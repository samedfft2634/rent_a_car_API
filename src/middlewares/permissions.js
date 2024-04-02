'use strict'
/* __________________ Permissions __________________ */
module.exports = {
    isLogin:async(req,res,next)=>{
        
        // return next()
        if(req.user && req.user.isActive){
            next()
        } else{
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login.')
        }
    },

    isStaff: (req, res, next) => {

        // return next()
        if (req.user && req.user.isActive && (req.user.isAdmin || req.user.isStaff)) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login and to be Admin.')
        }
    },

    isAdmin:async(req,res,next)=>{
        // return next()
        if(req.user  && req.user.isActive && req.user.isAdmin){
            next()
        } else{
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login and  be Admin')
        }
    },
}
// const permissions = require('../middlewares/permissions')