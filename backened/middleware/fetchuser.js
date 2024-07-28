

const jwt = require("jsonwebtoken");
const JWT_SECRET = "iamagood$girl";


const fetchuser=(req,res,next)=>
{

      //GET THE USER FROM JWT TOKEN AND ADD ID  TO req obj

      const token=req.header('auth-token')
      if(!token){
        res.status(401).send({error:"please authenticate using a valid token"})
      }
   try{
      const data=jwt.verify(token,JWT_SECRET);
      req.user=data.user;
    }
      catch(error){

        res.status(401).send({error:"please authenticate using a valid token"})

      }
    next();
}

module.exports=fetchuser;