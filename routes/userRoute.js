const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isLoggedIn = require("../config/isLoggedIn");
const productModel=require("../models/productModel")
const mongoose=require("mongoose");

//user all route create update read ande all user rekated router create here
//user create page route
router.get("/register", (req, res) => {
  res.render("register");
});

//user create route
router.post("/register", async (req, res) => {   
 
  let { username, fullname, email, contact_no, password, order, product } =
    req.body;
  //user crete not again use this email for create accoute alredy use to this email;
  let user = await userModel.findOne({ email });
  if (user) {
    req.flash("already_user","your account already exit.. please login")
    res.redirect("/user/login");
    return;
  }
  //hash user password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let CreatedUser = await userModel.create({
        username,
        fullname,
        email,
        contact_no,
        password: hash,
        order,
        product,
      });

      //setup jwt token for user login rahnya sathi
      let token = jwt.sign(
        { email: CreatedUser.email, userId: CreatedUser._id },
        "auhcbeauiuchisadhciuadshciudsahcuhohaifucaidhvfav"
      );
      res.cookie("token", token);
      res.redirect("/");
    });
  });
});

//user page login route
router.get("/login", (req, res) => {
  res.render("login",{message:req.flash("password_wrong"),user_alredy:req.flash("already_user")});
});

//login user route
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) {
    res.redirect("/user/register");
  } else {
    bcrypt.compare(password, user.password, (err, result) => {
      if (result == true) {
        //setup jwt token for user login rahnya sathi
        let token = jwt.sign(
          { email: user.email, userId: user._id },
          "auhcbeauiuchisadhciuadshciudsahcuhohaifucaidhvfav"
        );
        res.cookie("token", token);
        res.redirect("/");
        return;
      }
      req.flash("password_wrong","user password is wrong");
      res.redirect("/user/login");
    });
  }
});

//user logout route
router.get("/logout", async (req, res) => {
  res.cookie("token", "");
  res.redirect("/")
});

//user read route
router.get("/read",isLoggedIn,async(req,res)=>{
  let user= await userModel.findOne({email:req.user.email}).populate("product");
  res.render("user",{user});
  
  
  
})

module.exports = router;
