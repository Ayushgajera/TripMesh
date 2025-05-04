const User=require("../models/User.js");
const responseService=require("../helpers/responseService.js");


const becomeDriver=async(req,res)=>{
    try {
        const userId=req.user.id;
        const formData=req.body;

        const user=await User.findById(userId);
        if(!user){
            const errorRes=responseService.error("User Not Found");
            return res.status(errorRes.status).json(errorRes);
        }
        if(user.role=="driver"){
            const errorRes=responseService.error("You are Already Driver");
            return res.status(errorRes.status).json(errorRes);
        }   
        if(user.driverApplication?.status==="pending"){
            const errorRes=responseService.error("Your Application is in Pending Status");
            return res.status(errorRes.status).json(errorRes);
        }
        user.driverApplication={
            status:"pending",
            formData,
            appliedAt:new Date()
        }
        await user.save();

        const successResponse=responseService.success("Driver Application submitted SuccessFully",user.driverApplication);
        return res.status(successResponse.status).json(successResponse);

    } catch (error) {
        const errResponse=responseService.internalServerError(error);        
        return res.status(errResponse.status).json(errResponse);
    }

}


module.exports={
    becomeDriver
}