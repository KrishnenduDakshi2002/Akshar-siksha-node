const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const path = require('path');
const port = process.env.PORT || 3000;

// Authentication route
const authRoute = require('./routes/auth');

// reset password page route
const reset_pass_page_route = require('./routes/resetPass');

//user dashboard
const DashBoard_route = require('./routes/DashBoard');


// classroom route

const classroom_route = require('./routes/classroom');

// categories route
const categories_route = require('./routes/Categories');

// contribution route

const contribution_route = require('./routes/Contributions');






// Statics files
app.use(express.static('public'));
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname + 'public/js'))
app.use('/img',express.static(__dirname + 'public/img'))


// set views
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


// Importing ROUTES

app.get('/',async (req,res)=>{
    res.json({"Congratulation message":"Successfully deployed our Node app",
            "Team message":"Hi, guys, this is our deployed node app. You will soon see your login functionality in the Akshar app",
            "Author":"krishnendu Dakshi",
            "Deployed at":"8.50 AM  10 August 2022",
            "Members":['Ankesh Banerjee','Arjya Bhattacharjee','Sukanya Sadhukhan','Soumaydip Mondal','Rajarshi Roy','Krishnendu Dakshi'],
            "Mentors":['Krishna Bose Dada','Shrabanti Mazumdar Didi']});
})

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/user',authRoute);
app.use('/user/reset_password_page',reset_pass_page_route);
app.use('/api/data/get/user/dashboard',DashBoard_route);
app.use('/api/data/classroom',classroom_route);
app.use('/api/data/categories', categories_route);
app.use('/contribution',contribution_route);

// serving static files
// servering images
app.get('/image/img/icon.png',async(req,res)=>{

    res.download('public/img/icon.png');  // this will download the image
})

// pdf download
app.get('/materials/',async(req,res)=>{

    res.download('public/Materials/DataStructures.pdf');  // this will download the image
})


//Connect to db

mongoose.connect(process.env.DB_CONNECTION,()=>{
    console.log('Connected!!');
});

// How do we start listening to the server
app.listen(port,()=>{console.log("Server running!")}) // portnumber