const jwt=require("jsonwebtoken");

const verifyToken=async (req,res,next)=>{
    const accessToken=req.cookies.accessToken;
    if(!accessToken) return res.status(401).json({message:"Access Token is Required"});
    jwt.verify(accessToken,process.env.ACCESS_TOKEN_SCERET,(err,user)=>{
        if(err) return res.status(403).json({message:"Access Token is Expired or Invalid"});
        req.user=user;
        next();
    })
}

module.exports=verifyToken;