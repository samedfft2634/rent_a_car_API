"use strict"
/* _________ dateToLocaleString(date:Date) _________ */

module.exports = function (dateData) {
    return dateData.toLocaleString('tr-tr', { dateStyle: 'full', timeStyle: 'medium' })
}