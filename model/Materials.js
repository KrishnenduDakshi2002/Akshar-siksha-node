const mongoose = require('mongoose');
const Class = require("../model/Class");

const MaterialSchema = mongoose.Schema({
    topic: String,
    provided_by : {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    dateTime:{
        type: Date,
        default : Date.now
    },
    link : String
})


module.exports =  mongoose.model('Material',MaterialSchema); 