const router=require("express").Router();
const { becomeDriver } = require("../controllers/driverController.js");
const verifyToken=require("../helpers/verifyToken.js");


router.post("/become-driver",verifyToken,becomeDriver);


module.exports=router;