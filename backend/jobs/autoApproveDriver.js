const User=require("../models/User.js");

async function autoApproveDrivers(){
    // const threeDaysAgo=new Date(Date.now()-3*24*60*60*1000);
    const oneMinuteAgo = new Date(Date.now() - 1 * 60 * 1000); 

    const usersToUpdate=await User.find({
        "driverApplication.status":"pending",
        "driverApplication.appliedAt":{$lte:oneMinuteAgo}
    })
    for(const user of usersToUpdate){
        user.driverApplication.status="approved";
        user.role="driver";
        await user.save();
        console.log(`Approved driver application for ${user.email}`);
    }
}


module.exports=autoApproveDrivers;
