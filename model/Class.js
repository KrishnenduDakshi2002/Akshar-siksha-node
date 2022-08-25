const mongoose = require('mongoose');
const moment = require('moment')

const ClassSchema = mongoose.Schema({
    topic: String,
    subject: String,
    teacher : String,
    dateTime: {
        type: Date,
        default : moment().utc(true).toDate()   // this will store the local time ( as date obj)
    },
    classLink : String  // it can be a meet link or firebase video url
})


module.exports =  mongoose.model('Class',ClassSchema); 