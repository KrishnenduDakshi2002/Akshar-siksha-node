const mongoose = require("mongoose")

const donateSchema = new mongoose.Schema({
    Fname:{
        type: String,
        required: true,
    },
    Lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    
    Phone: {
        type: Number,
        required: true,
        max:10,
        min:10
    },
    password: {
        type: String,
        required: true,
    },

})

module.exports = mongoose.model("donate",donateSchema)