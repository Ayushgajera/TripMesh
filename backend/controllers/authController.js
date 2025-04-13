const User=require("../models/User");
const responseService=require("../helpers/responseService.js");
const { validatePassword } = require("../helpers/validatePassword.js");
const generateTokens = require("../helpers/generateToken.js");


const signUp=async(req,res)=>{
    const {userName,email,password,role}=req.body;
    try {
        const userExist=await User.findOne({email});
        if(userExist){
            const errorRes=responseService.error("User Already Exist")
            return res.status(errorRes.status).json(errorRes);
        }
        if(!validatePassword(password)){
            const  errorRes=responseService.error("Password Must contain at least one lowercase,uppercase character,one digit,one special character");
            return res.status(errorRes.status).json(errorRes);
        }
        const user=new User({
            userName,
            email,
            password,
            role
        });
        await user.save();
        
        const successResponse=responseService.create("User Created SuccessFully",user);
        return res.status(successResponse.status).json(successResponse)
    } catch (error) {
        const errResponse=responseService.internalServerError(error);        
        return res.status(errResponse.status).json(errResponse);
    }
}

const login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user){
            const errResponse=responseService.error("User Not Found");
            return res.status(errResponse.status).json(errResponse);
        }
        const isMatch=await user.comparePassword(password);
        if(!isMatch){
            const errResponse=responseService.error("Invalid Email or Password!!!");
            return res.status(errResponse.status).json(errResponse);
        }
        const {accessToken,refreshToken}=generateTokens(user);
        res.cookie("accessToken",accessToken,{
            httpOnly:true,
            secure:false,
            samesite:"lax",
            maxAge:15*60*1000
        });
        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure:false,
            samesite:"lax",
            maxAge:7*24*60*60*1000
        })

        const successResponse=responseService.success("User LogIn successFully",user);
        return res.status(successResponse.status).json(successResponse);
    } catch (error) {
        console.log(error)
        const errResponse=responseService.internalServerError(error);        
        return res.status(errResponse.status).json(errResponse);
    }
}

module.exports={
    signUp,
    login
}