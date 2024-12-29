require("dotenv").config();
const express = require("express");
const cookieParse =require("cookie-parser");
const app = express();
const path=require("path");
const indexRouter= require("./routes/indexRoute");
const userRoute=require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const DB_connection = require("./config/db_connection");
const expressSession = require("express-session");
const flash =require("connect-flash");
const PORT =process.env.PORT



//express session setup
app.use(expressSession({
    secret: process.env.session_secreate,
  resave: false,
  saveUninitialized: true,
}))
//flash messge setup
app.use(flash());

//app setup
app.use(cookieParse());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));


//app route
//home route
app.use("/",indexRouter);
//user  route
app.use("/user",userRoute);
//product route
app.use("/product",productRoute);
//app port on this listen
app.listen(PORT, () => console.log("sever is started"));
