const jwt = require('jsonwebtoken');


// middelware function()
 const fetchuser= async(req,res,next)=>{

const token=req.cookies.token || req.header('token')
if(!token){
  return  res.status(401).send({error:"Please authenticate a vaild token"})
}

try {
    // extracting user id from token
    const id=jwt.verify(token,"sultanbhai");
    req.user=id;
    next();
    
} catch (error) {
    res.status(401).send({error:"Please authenticate a vaild token"});
}
}



module.exports=fetchuser;