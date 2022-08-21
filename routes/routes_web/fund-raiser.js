const { render } = require("ejs");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const path = require("path");
const multer = require("multer")
const app = express();
const http = require("http").createServer(app);
const formidable = require("formidable");
const fs = require("fs");

const startFund = require("../../model/model_web/start-fundraiser");
const { resourceLimits } = require("worker_threads");
const startFundraiser = require("../../model/model_web/start-fundraiser");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// database connection
const uri =
  "mongodb+srv://raj4321:YIfQx247fYNf0YW0@braincellsdb.ajb1asy.mongodb.net/?retryWrites=true&w=majority";
const db = mongoose.connect(uri);
const con = mongoose.connection;


// static files
router.use(
  "/css_web",
  express.static(path.join(__dirname, "../../public/css_web"))
);
router.use(
  "/js_web",
  express.static(path.join(__dirname, "../../public/js_web"))
);
router.use(
  "/img_web",
  express.static(path.join(__dirname, "../../public/img_web"))
);
router.use(
  "/file",
  express.static(path.join(__dirname, "../../public/img_fund"))
);
console.log(path.join(__dirname, "../../public/img_fund"))

// disk storage
const Storage =multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null, (path.join(__dirname, "../../public/img_fund")))
  },
  filename:(req,file,cb) => {
    var FILEname = file.originalname.substring(0, file.originalname.length - 4) 
  
    cb(null,Date.now() + "--" + FILEname + path.extname(file.originalname))
  },
})

const upload =multer({
  storage:Storage
}).single("uploaded_file")


// Set views for website

app.set("views", path.join(__dirname, "../../views/views_web"));
app.set("view engine", "ejs");




// login
router.get("/start-funding", async (req, res) => {
  res.render("start-fundraiser.ejs",{msg:""});
});

router.post("/start-funding",upload,async (req, res) => {
//  storing data in tempary schema
console.log("hello 1")

  // const formData = new formidable.IncomingForm()
  // formData.parse(req, function(error,fields,files){
  //   const extension = files.file.name.substr(files.filename.name.lastIndexOf("."))
  //   const newPath = "file" + extension
  //   console.log("hello 2")
  //   fs.rename(files.file.path, newPath, function(errorRename){
  //     result.send("File saved")
  //     console.log("hello 3")

  //   })
  //   console.log(newPath,"hello")
  //   console.log(extension,"bye")


  
  // })
  


console.log(req.file.filename,"fafffffffffff")
// res.send("lets see")
    // upload(req,res,(err)=>{
      // if(err){
      //   console.log(err)
      // } else{
        const user_ = new startFund({
          cause: req.body.cause,
          name: req.body.name,
            email: req.body.email,
            phone_no: req.body.phone_no,
            problem_statement: req.body.prob_statement,
            problem_description: req.body.prob_description,
            Amount: req.body.target_amount,
            image: req.file.filename,
          });
          user_.save()
      // }
    // })
    
    console.log(req.body,"hhhhhhhhhhhhhh")
    // const donate = await startFund.find()
    // console.log(donate) 
    // 
  
});
  
  






// user home pages
router.get("/home-page", async (req, res) => {
  res.render("landing-home-post-login.ejs");
});

// landing pages
router.get("/main-page", async (req, res) => {
  res.render("landing-home.ejs");
});

// fundraiser pages
router.get("/fundraiser", async (req, res) => {
  res.render("fundraiser-home.ejs");
});

// donation pages
router.get("/donate", async (req, res) => {
  res.render("donate-post-login.ejs");
});

// demo
router.get("/demo", async (req, res) => {
  // startFundraiser.find({},function(funds){
  //   res.render("demo.ejs",{FundList:startFundraiser});
  // })
  res.render("demo.ejs")
});



module.exports = router;
