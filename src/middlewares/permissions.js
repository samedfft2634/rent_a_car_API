'use strict'
/* __________________ Permissions __________________ */
module.exports = {
    isLogin:async(req,res)=>{

        if(req.user && req.user.isActive){
            next()
        } else{
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login.')
        }
    },
    isAdmin:async(req,res)=>{
        if(req.user  && req.user.isActive && req.user.isAdmin){
            next()
        } else{
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login and  be Admin')
        }
    },
}
// const permissions = require('../middlewares/permissions')