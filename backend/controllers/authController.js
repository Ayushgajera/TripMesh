const User=require("../models/User");
const responseService=require("../helpers/responseService.js");
const { validatePassword } = require("../helpers/validatePassword.js");
const generateTokens = require("../helpers/generateToken.js");
const sendMail = require("../helpers/sendMail.js");
const jwt=require("jsonwebtoken");
const razorpay=require("../helpers/razorpay.js");
const PaymentOrder=require("../models/PaymentOrder.js")
const crypto = require("crypto");

const signUp=async(req,res)=>{
    const {userName,email,password}=req.body;
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

const forgotPassword=async(req,res)=>{
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
        console.log(user.password);
        if(!user){
            const errResponse=responseService.error("User Not Found");
            return res.status(errResponse.status).json(errResponse);
        }
        if(!validatePassword(password)){
            const  errorRes=responseService.error("Password Must contain at least one lowercase,uppercase character,one digit,one special character");
            return res.status(errorRes.status).json(errorRes);
        }
        const verify=jwt.verify(token,process.env.FORGOT_PASS_SCERET);
        if(!verify){
            const errResponse=responseService.error("Token are Expired");
            return res.status(errResponse.status).json(errResponse);
        }
        user.password=password;
        await user.save();
        console.log(user.password);
        const successResponse=responseService.success("Password Reseted SuccessFully",user);
        return res.status(successResponse.status).json(successResponse); 
    } catch (error) {
        const errResponse=responseService.internalServerError(error);        
        return res.status(errResponse.status).json(errResponse);
    }
}

const DespositeToWalllet=async(req,res)=>{
    const {amount}=req.body;
    const userId=req.user.id;
    
    const user=await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const paymentType = user.prefferedPayment;
    const receipt = "wd_" + crypto.randomBytes(6).toString("hex");

    const options={
        amount,
        currency:"INR",
        receipt,
        payment_capture:1,
        notes:{
            userId,
            paymentType:paymentType
        }
    }

    try {
        const order=await razorpay.orders.create(options);
        await PaymentOrder.create({
            userId,
            razorpayOrderId: order.id,
            amount,
            currency: order.currency,
            status: "created"
        })
        
        return res.status(200).json({
            orderId: order.id,
            currency: order.currency,
            amount: order.amount,
            paymentType
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message});
    }

}

const verifyPayment=async(req,res)=>{
    const {orderId,paymentId,signature,amount}=req.body;
    console.log(req.body);
    const userId=req.user.id;
    const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(orderId + "|" + paymentId)
    .digest("hex");

    if (generatedSignature !== signature) {
        return res.status(400).json({ message: "Invalid payment signature" });
    }

    const order = await PaymentOrder.findOne({ razorpayOrderId: orderId });
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "success";
    order.paymentId = paymentId;
    await order.save();

    const user = await User.findById(userId);
    user.wallet.balance += amount;
    user.wallet.transactions.push({
        type: "deposit",
        amount,
        status: "success",
        description: "Wallet deposit",
        paymentId,
    });
    await user.save();

    res.json({ message: "Wallet funded successfully", balance: user.wallet.balance });
}

module.exports={
    signUp,
    login,
    forgotPassword,
    resetPassword,
    DespositeToWalllet,
    verifyPayment
}