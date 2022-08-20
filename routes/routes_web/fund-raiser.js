const { render } = require("ejs");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const path = require("path");
const multer = require("multer")

const startFund = require("../../model/model_web/start-fundraiser");
const app = express();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// database connection
const uri =
  "mongodb+srv://raj4321:YIfQx247fYNf0YW0@braincellsdb.ajb1asy.mongodb.net/?retryWrites=true&w=majority";
const db = mongoose.connect(uri);
const con = mongoose.connection;

// disk storage
const Storage =multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null, "../../public/img_fund")
  },
  filename:(req,file,cb) => {
    cb(null,Date.now() + path.extname(file.originalname))
  },
})


const upload =multer({
  storage:Storage
}).single("uploaded_file")

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

// Set views for website

app.set("views", path.join(__dirname, "../../views/views_web"));
app.set("view engine", "ejs");




// login
router.get("/start-funding", async (req, res) => {
  res.render("start-fundraiser.ejs",{msg:""});
});

router.post("/start-funding",upload,async (req, res) => {
//  storing data in tempary schema
console.log(req.file,"fafffffffffff")
res.send("lets see")
    upload(req,res,(err)=>{
      if(err){
        console.log(err)
      } else{
        const user_ = new startFund({
          cause: req.body.cause,
          name: req.body.name,
            email: req.body.email,
            phone_no: req.body.phone_no,
            problem_statement: req.body.prob_statement,
            problem_description: req.body.prob_description,
            Amount: req.body.target_amount,
            image: req.body.uploaded_file,
          });
          // user_.save()
      }
    })
    
    console.log(req.body,"hhhhhhhhhhhhhh")
    //   checking input data
    // const namecheck = await register.find({ userName: req.body.username });
  
    // const emailcheck = await register.find({ email: req.body.email });
  
    // const phonecheck = await register.find({ phone_no: req.body.phone_no });
  
    
  
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

module.exports = router;
