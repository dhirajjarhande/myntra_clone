const jwt =require("jsonwebtoken")
function isLoggedIn(req,res,next){
   let token = req.cookies.token 
   if(!token){
    res.redirect("/user/register");
    return;
   }
   let secrete= process.env.isLoggin_secreate;
   let tokenUser = jwt.verify(token,secrete);
   req.user=tokenUser

   next();
}

module.exports=isLoggedIn;