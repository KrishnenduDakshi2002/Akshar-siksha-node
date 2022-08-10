const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const path = require('path');

// Authentication route
const authRoute = require('./routes/auth');

// reset password page route
const reset_pass_page_route = require('./routes/resetPass');


// Statics files
app.use(express.static('public'));
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname + 'public/js'))
app.use('/img',express.static(__dirname + 'public/img'))


// set views
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


// Importing ROUTES

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/user',authRoute);
app.use('/user/reset_password_page',reset_pass_page_route);


//Connect to db

mongoose.connect(process.env.DB_CONNECTION,()=>{
    console.log('Connected!!');
});

// How do we start listening to the server
app.listen(3000,()=>{console.log("Server running!")}) // portnumber