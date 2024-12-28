const mongoose = require("mongoose");

//create user schema

const productShema = mongoose.Schema({
  user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user",
  },
  name: String,
  description: String,
  price: String,
  Stock: String,
  category: String,
  images:String,
  discount:{
    type:Number,
    default :0,
  }
  
});

//create user model 
module.exports = mongoose.model("product", productShema);
