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
const Razorpay = require("razorpay")
// const stripe =require("stripe")("secret_key")
const domain ="http://localhost:3000"
var instance = new Razorpay({ key_id: 'rzp_test_WxRaJpBIMBim6H', key_secret: '64L2zfnhaDQTE4kexFju1OPG' })


const startFund = require("../../model/model_web/start-fundraiser");
const { resourceLimits } = require("worker_threads");
const donarInfo = require("../../model/model_web/donate");
const donarRazorpay = require("../../model/model_web/donate-razorpay");

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
  const fundInfo = await startFund.find()

  res.render("donate-post-login.ejs",{fund_info:fundInfo});

});

// router.post("/razor-pay", async (req, res) => {
//   res.send("hi");
//   instance.orders.create({
//     amount: 50000,
//     currency: "INR",
//     receipt: "receipt#1",
//     notes: {
//       key1: "value3",
//       key2: "value2"
//     }
//   })
// });


router.get("/donate-home", async (req, res) => {
  res.render("donate.ejs");
});

router.get("/login-signup", async (req, res) => {
  res.render("fundraiser-login-signup.ejs");
});

router.post("/login-signup", async (req, res) => {
  console.log(req.body)
  res.send("hello");
});

router.post("/payment-gateway", async (req, res) => {
  console.log(req.body)
  res.send("hello");
});


// demo
router.get("/donate-option/:id", async (req, res) => {
  // startFundraiser.find({},function(funds){
  //   res.render("demo.ejs",{FundList:startFundraiser});
  // })
  console.log(req.params.id)
  // const fundInfo = await startFund.find()
  res.render("razorpay-payment.ejs",{fund_info:req.params.id})
});


router.get("/payment", async (req, res) => {
  var options = {
    amount: "500",  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  var orderID= "hi"
  console.log(options,"ji")
  instance.orders.create(options, async function(err, order) {
    console.log(order);
    orderID=order.id
    const user_ = new donarRazorpay({
      order_id: orderID
    }) 
    var allOrders = await instance.orders.all()
    Element = allOrders[1]
    console.log(allOrders,"ffffffffffffffffffffffff")
    console.log(Element,"ffffffffffffffffffffffff")

     
  });
  
  res.render("razorpay-pay-option.ejs",{name:"order_K8eosnWJFtmwzz"})
});


router.post("/donate-option/:id", async (req, res) => {
  console.log(req.params.id,"jlllll")
  // const fundInfo = await startFund.find({problem_statement : req.params.id})
  const user_ = new donarRazorpay({
    cause:req.params.id,
    name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      
      amount: req.body.amount,
    
    });
    console.log(user_)
    res.redirect("/fund/payment")
})

router.post("/payment", async (req, res) => {
  
  var options = {
    amount: req.body.amount*100,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  var orderID= "hi"
  console.log(options)
  instance.orders.create(options, function(err, order) {
    console.log(order);
    orderID=order.id
    console.log(orderID,"ffffffffffffffffffffffff")
    res.send({orderId:orderID,amount:options.amount}) 
  });

  
  

  // instance.orders.create(options, function(err, order) {
  //   console.log(order);
  // });
  console.log(req.body)  
  console.log(orderID)  


});









module.exports = router;
