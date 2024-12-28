const express = require("express");
const router = express.Router();
const isLoggedIn = require("../config/isLoggedIn");
const upload =require("../config/multerFileData")
const productModel = require("../models/productModel");
const mongoose = require("mongoose");
const userModel = require("../models/userModel");

//product create page route
router.get("/create", isLoggedIn, (req, res) => {
  res.render("product");
});

// product create route
router.post("/create",isLoggedIn,upload.single("image"), async (req, res) => {
  let { name, description, discount, price, stock, category } = req.body;
  let user = await userModel.findOne({ email: req.user.email });
  let product = await productModel.create({
    images:req.file.filename,
    user: user._id,
    name,
    description,
    price,
    stock,
    category,
    discount,
  });
  user.product.push(product._id);
  await user.save();
  res.redirect("/");
  
});

module.exports = router;
