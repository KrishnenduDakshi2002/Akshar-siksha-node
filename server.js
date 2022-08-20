const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const port = 3000;
const app = express();
const server = express();



// database connection
const uri =
  "mongodb+srv://raj4321:YIfQx247fYNf0YW0@braincellsdb.ajb1asy.mongodb.net/?retryWrites=true&w=majority";
const db = mongoose.connect(uri);
const con = mongoose.connection;

// login route
const loginRoute = require("./routes/routes_web/login");
const fundRoute = require("./routes/routes_web/fund-raiser");
const google_logIn = require("./routes/routes_web/passport-google");
const facebook_logIn = require("./routes/routes_web/passport-facebook");
const twitter_logIn = require("./routes/routes_web/passport-twitter");

app.use("/user", loginRoute);
app.use("/fund", fundRoute);
app.use("/login", google_logIn );
app.use("/login", facebook_logIn );
app.use("/login", twitter_logIn );



// fund-raiser route
const fund_raiserRoute = require("./routes/routes_web/fund-raiser");
const { Passport } = require("passport");
app.use("/funds", fund_raiserRoute);

// connected
con.on("open", function () {
  console.log("connected...");
});

// idk
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// staticfiles

app.use("/css_web", express.static(path.join(__dirname, "public/css_web")));
app.use("/js_web", express.static(path.join(__dirname, "public/js_web")));
app.use("/img_web", express.static(path.join(__dirname, "public/img_web")));

// Set views for website

app.set("views", path.join(__dirname, "views/views_web"));
app.set("view engine", "ejs");

// end points

app.use("/login", (req, res) => {
  res.render("login-landing.ejs");
});

app.use("/register", (req, res) => {
  res.render("registration.ejs");
});

// app.post("/login", async (req,res) => {
//     console.log("post is working")
//     console.log(req.body, "hello")
// })

// const userRouter = require("./routers/routes")

// app.use('/user',() => {userRouter})

app.listen(port, () => {
  console.log("server started");
});

app.get("/home", (req, res) => {
  res.render("landing-home.ejs");
});

