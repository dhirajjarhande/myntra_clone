const express = require("express");
const router = express.Router();
const isLoggedIn = require("../config/isLoggedIn");
const productModel = require("../models/productModel");
const userModel =require("../models/userModel")


//index route


//user register page



 router.get("/", isLoggedIn, async(req,res) => {
  let product= await productModel.find().populate("user")
   res.render("home",{product});
  
 });

module.exports = router;
