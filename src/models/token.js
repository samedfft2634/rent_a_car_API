'use strict'
/* ___________________ Token Modal __________________ */
const {mongoose} = require('../configs/dbConnection')

const TokenSchema = new mongoose.Schema({
    
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        unique:true,
        index:true,
        required:true,
    },
    token: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
    }
},{
    collection:'tokens',
    timestamps:true,
})
module.exports=mongoose.model("Token",TokenSchema)