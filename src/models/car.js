'use strict'
/* ___________________ Car Modal __________________ */
const {mongoose} = require('../configs/dbConnection')
/* ______________________________________________ *
{
    "plateNumber": "34ABC123",
    "brand": "Ford",
    "model": "Focus",
    "year": 2020,
    "isAutomatic": true,
    "pricePerDay": 249.99,
    "isAvailable":true    
}
{
    "plateNumber": "34ABC234",
    "brand": "Renault",
    "model": "Megane",
    "year": 2022,
    "isAutomatic": false,
    "pricePerDay": 199.99,
    "isAvailable":true
}
{
    "plateNumber": "34ABC345",
    "brand": "Opel",
    "model": "Astra",
    "year": 2021,
    "isAutomatic": false,
    "pricePerDay": 189.99,
    "isAvailable":true
  
}
/* ______________________________________________ */
const CarSchema = new mongoose.Schema({
    
    plateNumber:{
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    brand:{
        type:String,
        trim:true,
        required:true,
    },
    model:{
        type:String,
        trim:true,
        required:true,
    },
    year: {
        type: Number,
        min: 1950,
        max: new Date().getFullYear(), 
        required: true
    },
    isAutomatic:{
        type:Boolean,
        default:false
    },
    pricePerDay:{
        type:Number,
        required:true,
    },
    images: {
        type: Array,
        default: []
    },
    isPublish:{
        type:Boolean,
        default:true,
    },
    createdId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true,
    },
    updatedId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true,
    },
 
},{
    collection:'cars',
    timestamps:true,
})
module.exports=mongoose.model("Car",CarSchema)