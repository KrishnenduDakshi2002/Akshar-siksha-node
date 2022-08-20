const mongoose = require('mongoose');
const Class = require("../model/Class");
const moment = require('moment')

const MaterialSchema = mongoose.Schema({
    topic: String,
    provided_by : {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    dateTime:{
        type: Date,
        default : moment().utc(true).toDate()   // this will store the local time ( as date obj)
    },
    link : String
})


module.exports =  mongoose.model('Material',MaterialSchema); 