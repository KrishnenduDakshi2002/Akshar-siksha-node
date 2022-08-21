const mongoose = require('mongoose');
const moment = require('moment')

const NoticeSchema = mongoose.Schema({
    sender: String,
    description : String,
    dateTime : {
        type : Date,
        default : moment().utc(true).toDate()   // this will store the local time ( as date obj)
    }
})


module.exports =  mongoose.model('Notice',NoticeSchema); 