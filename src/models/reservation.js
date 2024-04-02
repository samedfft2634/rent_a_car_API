'use strict'
/* ___________________ Reservation Modal __________________ */
const {mongoose} = require('../configs/dbConnection')
/* _______________________ _ _______________________ *
{
    "userId":"66088009248c3f52f0e25b7a", user 2
    "carId": "66088d014eacab3c8a3327fa", ford mustang
    "endDate": "2024-04-10",
    "startDate": "2024-04-07"
  }
/* _______________________ _ _______________________ */
const ReservationSchema = new mongoose.Schema({
    
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true,
    },
    carId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Car',
        required:true,
        index:true,
    },
    startDate:{
        type:Date,
        required:true,
    },
    endDate:{
        type:Date,
        required:true,
        validate:{
            validator:function(){return this.startDate < this.endDate}
        },
        message:"End Date must be greater than start date!"
    },
    amount: {
        type: Number,
        required: true
    },

    createdId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    updatedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
 
},{
    collection:'reservations',
    timestamps:true,
})
module.exports=mongoose.model("Reservation",ReservationSchema)