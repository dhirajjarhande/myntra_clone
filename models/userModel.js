const mongoose = require("mongoose");


//create user schema 
 
const userSchema =  mongoose.Schema({
    username:String,
    fullname:String,
    email:String,
    contact_no:String,
    password:String,
    product:[{
        
            type:mongoose.Schema.Types.ObjectId,
            ref:"product",
        
    }],
})

module.exports= mongoose.model("user",userSchema);