const mongoose =require("mongoose");

//const URI ="mongodb+srv://myntra:<ml424KCqAg1O5FTr>@myntra.4t8tg.mongodb.net/myntra?retryWrites=true&w=majority&appName=myntra"
 let uri=process.env.MONGODB_URI;

try {
    mongoose.connect(uri)
    console.log("database is connected successfuly");
} catch (error) {
    error;
    console.log("database is not connect");
}

module.exports=mongoose;