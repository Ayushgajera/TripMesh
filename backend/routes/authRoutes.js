const router=require("express").Router();
const { signUp, login,forgotPassword,resetPassword, DespositeToWalllet, verifyPayment, updateProfile} = require("../controllers/authController");
const verifyToken = require("../helpers/verifyToken");


router.post('/signup',signUp);
router.post('/login',login);
router.post('/forgotPassword',forgotPassword);
router.post('/reset-password/:id/:token',resetPassword);
router.post('/wallet/deposit',verifyToken,DespositeToWalllet);
router.post('/payment/verifypayment',verifyToken,verifyPayment);
router.post('/updateProfile',verifyToken,updateProfile);

module.exports=router;