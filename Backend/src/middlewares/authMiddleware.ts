const {verifyToken}=require("../services/jwtService")


module.exports=(req,res,next)=>{
  const authHeader=req.headers["authorization"]
  if (!authHeader){
    res.status(401).json({message:"token not provided"})
  }

  const token=authHeader.split(" ")[1]
  if(!token){
    res.status(401).json({ message: "Malformed token" })

  }

  try{
    const decoded= verifyToken(token)
    req.user=decoded
    next();
  }catch(err){
    res.status(401).json({ message: "Invalid or expired token" });
  }
};