const User=require("../models/User");
const responseService=require("../helpers/responseService.js");
const { validatePassword } = require("../helpers/validatePassword.js");
const generateTokens = require("../helpers/generateToken.js");
const sendMail = require("../helpers/sendMail.js");
const jwt=require("jsonwebtoken");


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

const   forgotPassword=async(req,res)=>{
    const {email}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user){
            const errorRes=responseService.error("User not Found");
            return res.status(errorRes.status).json(errorRes);
        }
        const token=jwt.sign({id:user._id,email:user.email},process.env.FORGOT_PASS_SCERET,{expiresIn:"1h"});
        const resetURL=`${process.env.CLIENT_URL}/reset-password/${user._id}/${token}`
        const text = `Hi ${user.name},\n\nYou requested to reset your password. Please use the link below:\n\n${resetURL}\n\nIf you didn’t request this, just ignore this email.`;
        const html = `
        <p>Hi <strong>${user.name}</strong>,</p>
        <p>You requested to reset your password. Click the button below to proceed:</p>
        <a href="${resetURL}" style="display:inline-block;padding:10px 20px;background:#007bff;color:#fff;text-decoration:none;border-radius:5px;">Reset Password</a>
        <p>If the button doesn't work, use this link:</p>
        <p><a href="${resetURL}">${resetURL}</a></p>
        <p>If you didn’t request this, just ignore this email.</p>
      `;
        await sendMail(user.email,"Password Reset Request",text,html);
        const successResponse=responseService.success("Reset Link Will Be Send To your mail",null);
        return res.status(successResponse.status).json(successResponse);

    } catch (error) {
        console.log(error);
        const errResponse=responseService.internalServerError(error);        
        return res.status(errResponse.status).json(errResponse);
    }
}

const resetPassword=async(req,res)=>{
    const {id,token}=req.params;
    const {password}=req.body;
    try {
        const user=await User.findOne({_id:id});
        if(!user){
            const errResponse=responseService.error("User Not Found");
            return res.status(errResponse.status).json(errResponse);
        }
        const verify=jwt.verify(token,process.env.FORGOT_PASS_SCERET);
        if(!verify){
            const errResponse=responseService.error("Token are Expired");
            return res.status(errResponse.status).json(errResponse);
        }
        await User.findOneAndUpdate(
            {
                _id:id
            },
            {
                $set:{
                    password:password
                }
            }
        );
        await user.save();
        const successResponse=responseService.success("Password Reseted SuccessFully",user);
        return res.status(successResponse.status).json(successResponse); 
    } catch (error) {
        const errResponse=responseService.internalServerError(error);        
        return res.status(errResponse.status).json(errResponse);
    }
}


module.exports={
    signUp,
    login,
    forgotPassword,
    resetPassword
}