const jwt=require("jsonwebtoken");

const generateTokens=(user)=>{
    const accessToken=jwt.sign(
        {id:user._id,role:user.role},
        process.env.ACCESS_TOKEN_SCERET,
        {expiresIn:"1d"}
    )

    const refreshToken=jwt.sign(
        {id:user._id,role:user.role},
        process.env.REFRESH_TOKEN_SCERET,
        {expiresIn:"7d"}
    )
    return {accessToken,refreshToken};
}

module.exports=generateTokens;
