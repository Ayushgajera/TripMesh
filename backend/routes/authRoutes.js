const router=require("express").Router();
const { signUp, login,forgotPassword,resetPassword} = require("../controllers/authController");


router.post('/signup',signUp);
router.post('/login',login);
router.post('/forgotPassword',forgotPassword);
router.post('/reset-password/:id/:token',resetPassword)

module.exports=router;