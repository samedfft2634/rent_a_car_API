"use strict"
/* ______________ MongoDB Connection: ______________ */
const mongoose = require('mongoose')

const dbConnection = function() {
    mongoose.connect(process.env.MONGO_DB)
        .then(() => console.log('* DB Connected * '))
        .catch((err) => console.log('* DB Not Connected * ', err))
}
module.exports = {mongoose,dbConnection} 