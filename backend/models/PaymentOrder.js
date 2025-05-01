const mongoose=require("mongoose");

const PaymentOrderSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    razorpayOrderId:{
        type:String,
        required:true,
        unique:true
    },
    amount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        default:"INR"
    },
    status:{
        type:String,
        default:"created"
    },
    paymentId:String
},{timestamps:true});

const PaymentOrder=mongoose.model("PaymentOrder",PaymentOrderSchema);

module.exports=PaymentOrder;