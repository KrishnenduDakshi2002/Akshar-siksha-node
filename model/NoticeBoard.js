const mongoose = require('mongoose');


const NoticeSchema = mongoose.Schema({
    sender: String,
    description : String,
    dateTime : {
        type : Date,
        default : Date.now
    }
})


module.exports =  mongoose.model('Notice',NoticeSchema); 